import { UserInputError } from '@redwoodjs/graphql-server'

import allRules from 'src/rules/**/**.{js,ts}'

import { logger } from 'src/lib/logger'
import { log } from 'src/lib/util'
// let timeRemaining = 10000
// let shortenFile = (fileName) => {
//   // return everything after /rules/
//   let regex = /(.+\/rules)(.+)/gm
//   return fileName.replace(regex, `$2`)
// }
let loadRules = async (allRules, table, when, operation) => {
  let arrRules = Object.keys(allRules).map((k) => allRules[k])
  arrRules.sort((a, b) => a.order - b.order)
  arrRules = arrRules.filter((rule) => {
    if (
      rule.active &&
      rule.table === table &&
      rule.when.includes(when) &&
      rule.operation.includes(operation)
    ) {
      return true
    } else {
      return false
    }
  })
  arrRules = arrRules.filter((rule) => {
    let requiredFields = [
      'order',
      'when',
      'operation',
      'command',
      'active',
      'file',
    ]
    var errors = false
    requiredFields.forEach((field) => {
      if (!rule[field]) {
        logger.error(
          `${field} is required for rule ${rule?.title || rule?.file}`
        )
        errors = true
      }
    })
    if (!errors) {
      return true
    } else {
      return false
    }
  })
  //let ruleNames = arrRules.map((rule) => {
  //  return `${rule.order} ${shortenFile(rule.file)}`
  //})
  //let message = [arrRules.length, table, when, operation]
  //logger.info(`${message.join(' ')} rules loaded \n${ruleNames.join('\n')}`)
  return (await arrRules) || []
}
let exitWhenNotSuccess = (status) => {
  if (status.code != 'success') {
    console.log(`Error in ${status?.file}`)
    log(
      `${status.message || `Status code != "success"`}`,
      `api\\${status.file}`
    )
    throw new UserInputError(status?.message || `Error in ${status?.file}`)
  }
}
/**
 * Runs the rules before create across all models
 * @param {string} table - the model you're running rules for
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
 * @param {object} data - the object of elements you want to insert
 * @returns {object} { data, status }
 */
export const executeBeforeCreateRulesV2 = async ({ table, data }) => {
  let rules = await loadRules(allRules, table, 'before', 'create')
  console.log(`RUNNING executeBeforeCreateRulesV2 ${table}`)
  let status = { code: 'success', message: '' }
  for (let rule of rules) {
    try {
      if (status.code == 'success') {
        status.file = rule.file.split('\\dist\\')[1]
        console.log({ function: './src/lib/rules.js', file: status.file })
        let output = await rule.command({ data, status })
        status = output?.status
        data = output?.data
        console.log({ data, status })
      }
      if (status.code != 'success') {
        break
      }
    } catch (error) {
      status = { code: 'error from catch', message: error }
      break
    }
  }
  exitWhenNotSuccess(status)
  /*
  for (let i = 0; i < rules.length; i++) {
    let rule = rules[i]
    console.log(`Executing ${rule.file}`)
    let returnObj = await rule.command({ data, status })
    data = returnObj.data
    status = returnObj.status
    console.log(`Executed ${rule.file}, status: ${status.code}`)
    if (status.code != 'success') {
      console.log(`STOPPING executeBeforeCreateRulesV2 ${table}`)
      throw exitWhenNotSuccess(status)
    }
  }
*/
  console.log(`STOPPED executeBeforeCreateRulesV2 ${table}`)
  return { data, status }
}

/**
 * Runs the rules before create across all models
 * @param {string} table - the model you're running rules for
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
 * @param {object} data - the object of elements you want to insert
 * @returns {object} { data, status }
 */
export const executeAfterCreateRulesV2 = async ({ table, data }) => {
  console.log({ function: 'executeAfterCreateRulesV2', table, data })
  let rules = await loadRules(allRules, table, 'after', 'create')
  let status = { code: 'success', message: '' }
  for (let rule of rules) {
    try {
      if (status.code == 'success') {
        status.file = rule.file.split('\\dist\\')[1]
        console.log({ function: './src/lib/rules.js', file: status.file })
        let output = await rule.command({ data, status })
        status = output?.status || status
        data = output?.data
        console.log({ data, status })
      }
      if (status.code != 'success') {
        break
      }
    } catch (error) {
      status = { code: 'error from catch', message: error }
      break
    }
  }
  //rules.forEach(async (rule) => {
  //  await rule.command({ data, status })
  //})
  exitWhenNotSuccess(status)
  // we return status as part of the return object
  return { record: data, status }
}
/**
 * Runs the rules before create across all models
 * @param {string} table - the model you're running rules for
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
 * @param {object} data - the object of elements you want to insert
 * @returns {object} { data, status }
 */
export const executeBeforeReadAllRulesV2 = async ({ table, filter, q }) => {
  let rules = await loadRules(allRules, table, 'before', 'readAll')
  let where = []
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ where, filter, q, status })
  })
  exitWhenNotSuccess(status)
  // we return status as part of the return object
  return { where, filter, q }
}
export const executeAfterReadAllRulesV2 = async ({ table, data }) => {
  let rules = await loadRules(allRules, table, 'after', 'readAll')
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ data, status })
  })
  exitWhenNotSuccess(status)
  // we return status as part of the return object
  return { records: data, status }
}

/**
 * Runs the rules before create across all models
 * @param {string} table - the model you're running rules for
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
 * @param {object} data - the object of elements you want to insert
 * @returns {object} { data, status }
 */
export const executeBeforeUpdateRulesV2 = async ({ table, data, cuid }) => {
  let rules = await loadRules(allRules, table, 'before', 'update')
  console.log({ function: 'executeBeforeUpdateRulesV2' })
  let status = { code: 'success', message: '' }
  for (let rule of rules /* needs to be a for of to allow break */) {
    try {
      if (status.code == 'success') {
        status.file = rule.file.split('\\dist\\')[1]
        //console.log({ function: './src/lib/rules.js', file: status.file })
        console.log(`Executing Before [${rule.order}] update ${status.file}`)
        let output = await rule.command({ data, status, cuid })
        status = output?.status
      }
    } catch (error) {
      status = { code: 'error from catch', message: error }
      break // stops other rules from running
    }
  }
  exitWhenNotSuccess(status)
  return { data, status }
}

export const executeBeforeDeleteRulesV2 = async ({ table, cuid }) => {
  let rules = await loadRules(allRules, table, 'before', 'delete')
  let status = { code: 'success', message: '' }
  for (let rule of rules /* needs to be a for of to allow break */) {
    try {
      let output = await rule.command({ cuid, status })
      status = output.status
    } catch (error) {
      console.log({ funciton: 'executeBeforeDeleteRulesV2', error })
      status = { code: 'error from catch', message: error }
      break
    }
  }
  exitWhenNotSuccess(status)
  return { cuid, status }
}
export const executeAfterDeleteRulesV2 = async ({ table, data }) => {
  console.log('starting executeafterdeleterulesv2', table, data)
  let rules = await loadRules(allRules, table, 'after', 'delete')
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ data, status })
  })
  exitWhenNotSuccess(status)
  return { data, status }
}

/**
 * Runs the rules before create across all models
 * @param {string} table - the model you're running rules for
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
 * @param {object} data - the object of elements you want to insert
 * @returns {object} { data, status }
 */
export const executeAfterUpdateRulesV2 = async ({ table, data }) => {
  let rules = await loadRules(allRules, table, 'after', 'update')
  let status = { code: 'success', message: '' }
  //console.log({ function: 'executeAfterUpdateRulesV2', rules })
  for (let rule of rules /* needs to be a for of to allow break */) {
    try {
      if (status.code == 'success') {
        status.file = rule.file.split('\\dist\\')[1]
        //console.log({ function: './src/lib/rules.js', file: status.file })
        console.log(`Executing After [${rule.order}] Update ${status.file}`)
        let output = await rule.command({ data, status })
        status = output?.status
      }
    } catch (error) {
      status = { code: 'error from catch', message: error }
      break // stops other rules from running
    }
    exitWhenNotSuccess(status)
    // we return status as part of the return object
    console.log(`STOPPED executeAfterUpdateRulesV2 ${table}`)
    return { record: data, status }
  }
}

export const executeBeforeReadRulesV2 = async ({ table, cuid }) => {
  let rules = await loadRules(allRules, table, 'before', 'read')
  let where = []
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ where, cuid, status: status })
  })
  exitWhenNotSuccess(status)
  return { where: where[0], cuid, status }
}

export const executeAfterReadRulesV2 = async ({ table, data }) => {
  let rules = await loadRules(allRules, table, 'after', 'read')
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ data, status })
  })
  // we return status as part of the return object
  return { record: data, status }
}

export const executeBeforeReadRules = async (table, cuid) => {
  let rules = await loadRules(allRules, table, 'before', 'read')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      cuid = await rule.command(cuid)
    })
  }
  return await cuid
}
export const executeAfterReadRules = async (table, record) => {
  let rules = await loadRules(allRules, table, 'after', 'read')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      record = await rule.command(record)
    })
  }
  return await record
}
export const executeBeforeUpdateRules = async (table, input) => {
  let rules = await loadRules(allRules, table, 'before', 'update')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      input = await rule.command(input)
    })
  }
  return await input
}
export const executeAfterUpdateRules = async (table, record) => {
  let rules = await loadRules(allRules, table, 'after', 'update')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      record = await rule.command(record)
    })
  }
  return await record
}
export const executeBeforeDeleteRules = async (table, cuid) => {
  let rules = await loadRules(allRules, table, 'before', 'delete')
  if (rules.length > 0) {
    rules.forEach((rule) => {
      cuid = rule.command(cuid)
    })
  }
  return await cuid
}
export const executeAfterDeleteRules = async (table, record) => {
  let rules = await loadRules(allRules, table, 'after', 'delete')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      record = await rule.command(record)
    })
  }
  return await record
}
