import CryptoJS from 'crypto-js'

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

export const generateLoginToken = async ({ email }) => {
  console.log({ function: 'generateLoginToken', email })
  try {
    // look up if the user exists
    let lookupUser = await db[table].findFirst({ where: { username: email } })
    if (!lookupUser) return { message: 'Login Request received' }

    // here we're going to generate a random password of 6 numbers, then hash it properly
    let randomNumber = (() => {
      let number = Math.floor(Math.random() * 1000000)
      if (number < 100000) number = number + 100000
      return number.toString()
    })()
    // because we're really just modifying how dbauth worked we have a salt
    // and a hashedPassword.  We're going to use the salt to hash the random number
    // and then store that in the hashedPassword field
    // first we'll generate a new salt
    let salt = (() => {
      let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      charSet += 'abcdefghijklmnopqrstuvwxyz'
      charSet += '0123456789'
      let randomString = ''
      for (var i = 0; i < 30; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPoz, randomPoz + 1)
      }
      return randomString
    })()
    // now we'll hash the random number with the salt
    let loginToken = CryptoJS.PBKDF2(randomNumber, salt, {
      keySize: 256 / 32,
    }).toString()
    // now we'll update the user with the new salt and hashedPassword
    let loginTokenExpiresAt = new Date()
    loginTokenExpiresAt.setMinutes(loginTokenExpiresAt.getMinutes() + 15)
    await updateUser({
      cuid: lookupUser.cuid,
      input: {
        salt,
        loginToken,
        loginTokenExpiresAt,
        _unencryptedToken: randomNumber,
        _email: lookupUser.email,
      },
    })
    return { message: 'Login Request received' }
  } catch (error) {
    console.log({ error })
    throw new UserInputError(error.message)
  }
}

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
    //console.log({ function: 'updateUser after', record })
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
