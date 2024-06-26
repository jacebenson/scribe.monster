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

let table = 'groupMember'

export const createGroupMember = async ({ input }) => {
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

export const groupMembers = async ({ filter, skip, orderBy, q, take }) => {
  try {
    let _take = (() => {
      let limit =
        take ||
        parseInt(context.currentUser.preferences['groupMember.pageSize'], 10) ||
        parseInt(context.currentUser.preferences['pageSize'], 10 || 10)
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
      take: _take,
      where,
      orderBy,
      skip, // if this were 101, return skip-take
    })
    let { records } = await executeAfterReadAllRulesV2({
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

export const groupMember = async ({ cuid }) => {
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

export const updateGroupMember = async ({ cuid, input }) => {
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

export const deleteGroupMember = async ({ cuid }) => {
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

export const GroupMember = {
  Group: (_obj, { root }) =>
    db[table].findUnique({ where: { cuid: root.cuid } }).Group(),
  User: (_obj, { root }) =>
    db[table].findUnique({ where: { cuid: root.cuid } }).User(),
}
