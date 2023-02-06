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

let table = 'user'

export const createUser = async ({ input }) => {
  console.log({ function: 'createUser', input })
  try {
    let data = input
    let preData = await executeBeforeCreateRulesV2({ table, data })
    data = preData.data
    let status = preData.status || { code: 'success', message: 'Omitted' }
    console.log({ function: 'createUser', data, status })
    let user = await db[table].create({ data })
    console.log({ function: 'createUser', user })
    let postData = await executeAfterCreateRulesV2({ table, data: user })
    let record = postData.record
    status = postData.status || { code: 'success', message: 'Omitted' }
    console.log({ record, status })
    return { ...record }
  } catch (error) {
    console.log({ error })
    throw new UserInputError(error.message)
  }
}

export const users = async ({ filter, skip, orderBy, q, take }) => {
  try {
    let _take = (() => {
      let limit =
        take ||
        parseInt(context.currentUser.preferences['user.pageSize'], 10) ||
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
      take: _take || 10,
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

export const user = async ({ cuid }) => {
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
export const updateUser = async ({ cuid, input }) => {
  //console.log({ function: 'updateUser', cuid, input })
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
    console.log({ function: 'updateUser after', record })
    return { ...record }
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const deleteUser = async ({ cuid }) => {
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

export const User = {
  GroupMember: (_obj, { root }) => {
    console.log({ function: 'service users.js', root })
    return db[table].findUnique({ where: { cuid: root.cuid } }).GroupMember()
  },
  Preference: (_obj, { root }) =>
    db[table].findUnique({ where: { cuid: root.cuid } }).Preference(),
}
