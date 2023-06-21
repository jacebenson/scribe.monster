import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { executeRules } from 'src/lib/rules'
import { Thread } from '../threads/threads'

let table = 'question'

export const createQuestion = async ({ input }) => {
  try {
    //let { data, status } = await executeBeforeCreateRulesV2({
    //  table,
    //  data: input,
    //})
    let { data: modifiedData, status: beforeStatus } = await executeRules({
      table: 'question',
      data: input,
      when: 'before',
      operation: 'create',
    })
    let logableData = { ...modifiedData }
    delete logableData.rephrasedTextVector
    console.log({
      function: 'createQuestion',
      table,
      data: {
        ...modifiedData,
        rephrasedTextVector: '...'
      },
      status: beforeStatus,
    })
    if(beforeStatus.code !== 'success'){
      return {
        table,
        result: [],
        message: 'Failed to create question',
        status: beforeStatus,
      }
    }
    let createdRecord = await db[table].create({ data: modifiedData })
    let { data: postModifiedData, status: afterStatus } = await executeRules({
      table: 'question',
      data: {
        ...createdRecord,
        Thread: {
          connect: {
            cuid: createdRecord.threadCuid
          }
        }
      },
      when: 'after',
      operation: 'create',
    })
    console.log({
      function: 'createQuestion',
      table,
      data: postModifiedData,
      status: afterStatus,
    })
    if(afterStatus.code !== 'success'){
      return {
        table,
        result: [],
        message: 'Failed to create question',
        status: afterStatus,
      }
    }
    return {
      table,
      result: [createdRecord],
      message: 'Successfully created question',
      status: afterStatus,
      cuid: createdRecord.cuid,
      threadCuid: createdRecord.threadCuid,
      active: createdRecord.active,
      state: createdRecord.state,
      text: createdRecord.text,
      createdAt: createdRecord.createdAt || new Date(),
      updatedAt: createdRecord.updatedAt || new Date(),
      Thread: {
        cuid: createdRecord.threadCuid,
        createdAt: createdRecord.Thread.createdAt || new Date(),
        updatedAt: createdRecord.Thread.updatedAt || new Date(),
        question: createdRecord.Thread.question,
      }
    }
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const questions = async ({ filter, skip, orderBy, q, take, select }) => {
  try {
    let preferences = context.currentUser.preferences
    let _take = (() => {
      let limit =
        take ||
        parseInt(preferences['question.pageSize'], 10) ||
        parseInt(preferences['pageSize'], 10 || 10) ||
        10
      if (limit > 100) return 100 //return 100 or limit whatever is smaller
      return limit
    })()
    let { where } = await executeBeforeReadAllRulesV2({ table, filter, q })
    where = { AND: [...where] } //nest all queries in an "AND"
    let count = await db[table].count({ where }) //100
    if (!skip) skip = 0
    if (count < skip) skip = count - _take || 0
    if (skip < 0) skip = 0
    let readRecords = await db[table].findMany({
      take: _take || 10,
      where,
      orderBy,
      skip, // if this were 101, return skip-take
      select,
    })
    let { records, status } = await executeAfterReadAllRulesV2({
      table,
      data: readRecords,
    })
    return {
      results: records,
      count,
      take: _take,
      skip,
      q: JSON.stringify(where),
    }
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const question = async ({ cuid }) => {
  try {
    let { where } = await executeBeforeReadRulesV2({ table, cuid })
    if (!where /* if where is falsy, return { cuid } */) {
      where = { cuid }
    }
    let readRecord = await db[table].findUnique({ where })
    let { record } = await executeAfterReadRulesV2({
      table,
      data: readRecord,
    })
    return record
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const updateQuestion = async ({ cuid, input }) => {
  try {
    let { data, where } = await executeBeforeUpdateRulesV2({
      table,
      data: input,
      cuid,
    })
    if (!where) {
      // if where is falsy, return { cuid }
      where = { cuid }
    }
    let updatedRecord = await db[table].update({ data, where })

    let { record } = await executeAfterUpdateRulesV2({
      table,
      data: updatedRecord,
      cuid,
    })
    return { ...record }
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const deleteQuestion = async ({ cuid }) => {
  try {
    let { where } = await executeBeforeDeleteRulesV2({
      table,
      cuid,
    })
    if (!where /* if where is falsy, return { cuid } */) {
      where = { cuid }
    }
    let deletedRecord = await db[table].delete({
      where: { cuid },
    })

    await executeAfterDeleteRulesV2({ table, data: deletedRecord })
    return deletedRecord
  } catch (error) {
    let lastLine =
      error.message.split('\n')[error.message.split('\n').length - 1]
    throw new UserInputError(lastLine)
  }
}

export const Question = {
  User: (_obj, { root }) =>
    db[table].findUnique({ where: { cuid: root.cuid } }).User(),
  Thread: (_obj, { root }) =>
    db[table].findUnique({ where: { cuid: root.cuid } }).Thread(),
}
