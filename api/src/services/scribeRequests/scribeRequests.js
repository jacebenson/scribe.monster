import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import {
  executeBeforeCreateRulesV2,
  executeAfterCreateRulesV2,
  executeBeforeReadAllRulesV2,
  executeAfterReadAllRulesV2,
  executeBeforeReadRulesV2,
  executeAfterReadRulesV2,
  executeBeforeUpdateRulesV2,
  executeAfterUpdateRulesV2,
  executeBeforeDeleteRulesV2,
  executeAfterDeleteRulesV2,
} from 'src/lib/rules'

let table = 'scribeRequest'

export const createScribeRequest = async ({ input }) => {
  try {
    let { data } = await executeBeforeCreateRulesV2({ table, data: input })
    let createdRecord = await db[table].create({ data })

    let { record } = await executeAfterCreateRulesV2({
      table,
      data: createdRecord,
    })
    return { ...record }
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const scribeRequests = async ({ filter, skip, orderBy, q, take }) => {
  console.log({ scribeRequests })
  try {
    let preferences = context.currentUser.preferences
    let _take = (() => {
      let limit =
        take ||
        parseInt(preferences['scriberequest.pageSize'], 10) ||
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

export const scribeRequest = async ({ id }) => {
  try {
    console.log({ function: 'sdl.scribeRequest', id })
    let { where } = await executeBeforeReadRulesV2({ table, id })
    if (!where /* if where is falsy, return { id } */) {
      where = { id }
    }
    let readRecord = await db[table].findUnique({ where })
    let { record } = await executeAfterReadRulesV2({
      table,
      data: readRecord,
    })
    //record.modelInstanceId = 0
    return record
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const updateScribeRequest = async ({ id, input }) => {
  try {
    let { data, where } = await executeBeforeUpdateRulesV2({
      table,
      data: input,
      id,
    })
    if (!where) {
      // if where is falsy, return { id }
      where = { id }
    }
    let updatedRecord = await db[table].update({ data, where })

    let { record } = await executeAfterUpdateRulesV2({
      table,
      data: updatedRecord,
      id,
    })
    return { ...record }
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const deleteScribeRequest = async ({ id }) => {
  try {
    let { where } = await executeBeforeDeleteRulesV2({
      table,
      id,
    })
    if (!where /* if where is falsy, return { id } */) {
      where = { id }
    }
    let deletedRecord = await db[table].delete({
      where: { id },
    })

    await executeAfterDeleteRulesV2({ table, data: deletedRecord })
    return deletedRecord
  } catch (error) {
    let lastLine =
      error.message.split('\n')[error.message.split('\n').length - 1]
    throw new UserInputError(lastLine)
  }
}

export const ScribeRequest = {
  user: (_obj, { root }) => {
    return db[table].findUnique({ where: { id: root.id } }).user()
  },
  modelInstance: (_obj, { root }) => {
    return db[table].findUnique({ where: { id: root.id } }).modelInstance()
  },
  totalTokens: (_obj, { root }) => {
    return root.queryTokens + root.responseTokens
  },
}
