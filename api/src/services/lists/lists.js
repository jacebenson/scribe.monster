import { camelCase } from 'camel-case'
import pluralize from 'pluralize'
import {cache} from 'src/lib/cache'

import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { definitions as fieldDefinitions } from 'src/lib/formFieldDefinitions'
import { definitions as listDefinitions } from 'src/lib/listFieldDefinitions'
import { executeRules } from 'src/lib/rules'
import { hasRole } from 'src/lib/auth'
let isPostgres = process.env.DATABASE_URL.includes('postgresql:')
export let getFieldsAndSelect = async ({ table, formDefinition, listDefinition }) => {
  let returnObj = {}
  let dmmf = await db._getDmmf()
  let models = dmmf.datamodel.models
  //console.log({ models })
  // lets loop over each model and print the tablename
  let singularTable = camelCase(pluralize(table, 1), { pascalCase: false })
  returnObj.pascalTable = camelCase(singularTable, { pascalCase: true })
  let pluralTable = camelCase(pluralize(table, 2), { pascalCase: true })
  //console.log({ singularTable, pascalTable })
  // lets figure out waht we can select
  returnObj.select = { cuid: true }
  let model = models.filter((model) => {
    // let matches = model.name === table ? '=' : '!='
    // console.log(`model.name[${model.name}] ${matches} pascalTable[${table}]`)
    return model.name === table
  })
  if (model.length === 0) {
    throw new Error(`No fields defined for ${table}`)
  }
  // lets merge the model and the listDefinitions
  let fields = model[0].fields // this is the model fields
  let definedFields = false
  let file = ''
  if (formDefinition) {
    file = 'formFieldDefinitions.js'
    definedFields = formDefinition[table] // this is the list fields
    // lets look at formFieldDefintitions and..replace
    let foundDef = await db.formDefinition.findFirst({
      where: {
        table: pluralTable
      }
    })
    // console.log({foundDef, table: pluralTable})
    if(foundDef){
      // lets replace the table with the formDefinition.content
      try {
        definedFields = JSON.parse(foundDef.content)
      } catch (error) {
        console.log({error})
        throw new Error(`Error parsing formDefinition for ${table}`)
      }
    }
  }
  if (listDefinition) {
    file = 'listFieldDefinitions.js'
    definedFields = listDefinition[table] // this is the list fields
  }
  if (!definedFields) {
    throw new Error(
      `No fields defined for ${table}, update ${file}`
    )
  }
  returnObj.fields = fields.map((field) => {
    // if the field is a named property in the listFields, then we return ...values
    // console.log({ field })
    if (definedFields[field.name]) {
      return {
        ...field,
        definition: {
          ...definedFields[field.name],
          label: definedFields[field.name].label || field.name,
        },
      }
    }
  })
  // now we need to remove the undefined values
  returnObj.fields = returnObj.fields.filter((field) => {
    return field !== undefined
  })

  // now lets loop over the fields and make a select object
  returnObj.fields.forEach((field) => {
    // if the kind is scalar, then we select it.
    if (field.kind === 'scalar') {
      returnObj.select[field.name] = true
    }
    // if the kind is object, then we need to loop over the fields and select them
    if (field.kind === 'object') {
      returnObj.select[field.name] = {}
      returnObj.select[field.name].select = {}
      returnObj.select[field.name].select[field.definition.display] = true
      returnObj.select[field.name].select[field.definition.value] = true
    }
  })
  // order returnObj.fields by order
  returnObj.fields.sort((a, b) => {
    return a.definition.order - b.definition.order
  })
  return {
    ...returnObj,
  }
}




//export let canI = async ({ operation, table }) => {
export let canI = ({ operation = 'read', table = 'undefined' }) => {
  // roles are named lowerUpperCase, e.g. groupMemberCreate, userCreate
  // that's called camelCase
  // opertaions are Upper, e.g. Create, Read, Update, Delete
  let operationCamel = camelCase(operation, { pascalCase: true })
  let tableCamel = camelCase(table, { pascalCase: true })
  let role = camelCase(`${table}${operation}`, { pascalCase: true })
  let allowed = false
  let username = context.currentUser && context.currentUser.username
  if (hasRole('admin')) {
    //console.log(`user is admin, and can do anything including ${operation}`)
    return true
  }
  if (hasRole(role)) {
    //console.log(`user has role ${role} and can ${operation}`)
    return true
  }
  //console.log(`user does not have role ${role} and can not ${operation}`)
  return false
}

export const createRecord = async ({ table, data }) => {
  // TODO: run before create rules
  //await canI({ operation: 'create', table })
  if(!canI({ operation: 'create', table })){
    return {
      table,
      result: [],
      message: 'You are not authorized to create this record',
      status: 'error',
    }
  }
  //console.log({ table, data, })
  let { data: modifiedData, status: beforeStatus } = await executeRules({
    table,
    data,
    when: 'before',
    operation: 'create',
  })
  //console.log({ modifiedData, beforeStatus })
  if (beforeStatus.code !== 'success') {
    return {
      table,
      result: [],
      message: 'Failed to create record',
      status: 'error',
    }
  }
  let create = await db[table].create({ data: modifiedData })
  console.log({ create })
  let { data: postModifiedData, status: afterStatus } = await executeRules({
    table,
    operation: 'create',
    data: create,
    when: 'after',
  })
  console.log({ postModifiedData, afterStatus })
  if (afterStatus.code !== 'success') {
    return {
      table,
      result: [],
      message: 'Failed after create record',
      status: 'error',
    }
  }
  // TODO: run after create rules
  // return the record with message, and status
  return {
    table,
    result: [create],
    message: 'Successfully created record',
    status: 'success',
  }
}

export const readRecord = async ({ table, cuid }) => {
  // we need to look up the record and return it
  if (!table) throw new UserInputError('No table specified')
  console.log({
    file: 'api/src/services/lists/lists.js',
    function: 'readRecord',
    table,
    cuid,
  })
  let returnObj = {}
  returnObj.table = table
  returnObj.cuid = cuid
  returnObj.select = { cuid: true }
  let { fields, select, pascalTable } = await getFieldsAndSelect({
    table,
    formDefinition: fieldDefinitions,
  })
  returnObj.fields = fields
  returnObj.select = select

  let record = null
  // trigger before read rules
  if (cuid) {
    // TODO: run before read rules
    record = await db[pascalTable].findUnique({
      where: { cuid },
      select: returnObj.select,
    })
    // TODO: run after read rules
  }
  // trigger after read rules
  returnObj.result = record
  return returnObj
}
// instead of list definitions... move this to a table...
export const readRecords = async ({
  table,
  page,
  where,
  skip,
  orderBy,
  take,
}) => {
  try {
    if(!canI({ action: 'read', table })){
      return {
        table,
        page,
        where,
        skip,
        orderBy,
        take,
        total: 0,
        results: [],
        message: `You do not have permission to read this table, ask for ${camelCase(`${table}read`)} role`,
        status: 'error'
      }
    }
    // now we need to ... decipher the filter and orderBy
    console.log({ table, page, where, skip, orderBy, take })
    let {
      data: beforeData,
      status: beforeStatus,
      page: beforePage,
      take: beforeTake,
      skip: beforeSkip,
      where: beforeWhere,
      orderBy: beforeOrderBy,
    } = await executeRules({
      table,
      data: { page, where, skip, orderBy, take },
      when: 'before',
      operation: 'readAll',
    })
    console.log({ beforeData, beforeStatus })
    if (beforeStatus.code !== 'success') {
      return {
        table,
        page,
        where,
        skip,
        orderBy,
        take,
        total: 0,
        results: [],
        message: 'Failed to read records',
        status: 'error',
      }
    }

    let returnObj = {}
    returnObj.table = table // comes in as pascal case User / ModelInstance
    returnObj.page = page
    returnObj.where = where
    returnObj.skip = skip || 0
    returnObj.orderBy = orderBy || 'cuid/desc'
    console.log({ where })
    // lets parse the filter
    returnObj.filter = {}
    // if the where is not blank
    if (where) {
      // the where string is seperated by `/`
      let whereArray = where?.split('/')
      // it will always have a key/operator/value/...
      // lets define the operators
      let operators = [
        ['is', 'equals'],
        ['equals', 'equals'],
        ['isNot', 'not'],
        ['not', 'not'],
        ['in', 'in'],
        ['notIn', 'notIn'],
        ['contains', 'contains'],
        ['startsWith', 'startsWith'],
        ['endsWith', 'endsWith'],
        ['lt', 'lt'],
        ['lte', 'lte'],
        ['gt', 'gt'],
        ['gte', 'gte'],
      ]
      // now lets loop through the whereArray
      whereArray.forEach((item, index) => {
        // this needs to take into account the type form dmmf
        // TODO: use DMMF to deterine the expectd type, today we are assuming based on the value
        let caseInsensitive = false
        // console.log({ item, index })
        if (whereArray.length % 3 !== 0) {
          throw new Error('Invalid where clause')
        }
        if (index % 3 === 0) {
          let key = item
          let operator = whereArray[index + 1]
          operators.forEach((op) => {
            if (op[0] === operator) {
              operator = op[1]
            }
          })
          let value = whereArray[index + 2]
          // console.log({ key, operator, value })
          // if value fails isNaN, then we need to convert it to a number
          if (!isNaN(value)) {
            value = Number(value)
          }
          // now we need to handle the value and convert it to the correct type
          // if the value is 'true' or 'false', then we need to convert it to a boolean
          if (value === 'true' || value === 'false') {
            value = value === 'true' ? true : false
          }

          // if the vlue is a string, then we need to decode it
          if (typeof value === 'string') {
            value = decodeURIComponent(value)
            caseInsensitive = true
          }
          // if the key does not include a '.' we just add this to the filter
          if (!key.includes('.')) {
            returnObj.filter[key] = {}
            if (!caseInsensitive) {
              returnObj.filter[key][operator] = value
            }
            if (caseInsensitive) {
              returnObj.filter[key][operator] = value
              if(isPostgres){
                returnObj.filter[key].mode = 'insensitive'
              }
            }
          }
          // console.log({ filter: returnObj.filter[key] })
          // if the key includes a '.' then we need to split it and add it to the filter
          if (key.includes('.')) {
            let relation = key.split('.')[0]
            let field = key.split('.')[1]
            returnObj.filter[relation] = {}
            returnObj.filter[relation][field] = {}
            if (!caseInsensitive) {
              returnObj.filter[relation][field][operator] = value
            }
            if (caseInsensitive) {
              returnObj.filter[relation][field][operator] = value
              if(isPostgres){
                returnObj.filter[relation][field].mode = 'insensitive'
              }
            }
          }
        }
      })
    }

    // now lets parse the orderBy
    // the orderBy string is seperated by `/`
    let orderArray = returnObj.orderBy.split('/')
    let orderField = orderArray[0]
    let orderDirection = orderArray[1]
    // it will always have a field/direction
    returnObj.order = { [orderField]: orderDirection }

    // we also need to get the fields for the table

    let { fields, select } = await getFieldsAndSelect({
      table,
      listDefinition: listDefinitions,
    })
    returnObj.fields = fields
    returnObj.select = select

    // TODO: before readall rules
    // console.log({ returnObj })

    // TODO: after readall rules


    // if table is SideBarItem then cache it
    // we can cache using like so
    /*const post = ({ id }) => {
      return cache(`posts`, () => {
        return db.post.findMany()
      }, { expires: 3600 })
    })*/
    // we need conditionally cache based on table, and time
    let tablesToCache = {
      SideBarItem: 3600,
    }
    if (tablesToCache[table]) {
      returnObj.total = await cache(`${table}-count`, async () => {
        return await db[table]?.count({
          where: returnObj.filter,
        })
      }, { expires: tablesToCache[table] })
      returnObj.results = await cache(table, async () => {
        return await db[table].findMany({
          take: Math.abs(take) || 10,
          skip: Math.abs(take) * ((Math.abs(page) || 1) - 1) || 0,
          where: returnObj.filter,
          orderBy: returnObj.order,
          select: returnObj.select,
        })
      }, { expires: tablesToCache[table] })
    } else {
      returnObj.total = await db[table]?.count({
        where: returnObj.filter,
      })
      returnObj.results = await db[table].findMany({
        take: Math.abs(take) || 10,
        skip: Math.abs(take) * ((Math.abs(page) || 1) - 1) || 0,
        where: returnObj.filter,
        orderBy: returnObj.order,
        select: returnObj.select,
      })
    }
    return { ...returnObj }
  } catch (error) {
    console.log({
      file: 'api/src/services/lists/lists.js',
      function: 'readRecords',
      error,
    })
    throw new UserInputError(error.message)
  }
}

export const updateRecord = async ({ table, cuid, data }) => {
  // TODO: before update rules
  if(!canI({ operation: 'update', table })){
    return {
      table,
      result: [],
      message: 'You are not authorized to update this record',
      status: 'error',
    }
  }
  console.log({ table, data, })
  let { data: modifiedData, status: beforeStatus } = await executeRules({
    table,
    data,
    cuid,
    when: 'before',
    operation: 'update',
  })
  console.log({ beforeRules: { modifiedData, beforeStatus }})
  if (beforeStatus.code !== 'success') {
    return {
      table,
      result: [],
      message: 'Failed to create record',
      status: 'error',
    }
  }

  let update = await db[table].update({
    where: { cuid },
    data: modifiedData,
  })
  // TODO: after update rules
  let { data: afterData, status: afterStatus } = await executeRules({
    table,
    data: update,
    cuid,
    when: 'after',
    operation: 'update',
  })
  if (afterStatus.code !== 'success') {
    return {
      table,
      result: [],
      message: 'Failed to create record',
      status: 'error',
    }
  }

  return {
    table,
    cuid,
    result: [update],
    message: 'Successfully updated record',
    status: 'success',
  }
}
export const deleteRecord = async ({ table, cuid }) => {
  // TODO: before delete rules
  if(!canI({ operation: 'delete', table })){
    return {
      table,
      result: [],
      message: 'You are not authorized to delete this record',
      status: 'error',
    }
  }
  console.log({ table, cuid, })
  let { data: modifiedData, status: beforeStatus } = await executeRules({
    table,
    data: { cuid },
    when: 'before',
    operation: 'delete',
  })
  if (beforeStatus.code !== 'success') {
    return {
      table,
      result: [],
      message: 'Failed to delete record',
      status: 'error',
    }
  }

  let deleted = await db[table].delete({
    where: { cuid },
  })
  let { data: afterData, status: afterStatus } = await executeRules({
    table,
    data: deleted,
    when: 'after',
    operation: 'delete',
  })
  if (afterStatus.code !== 'success') {
    return {
      table,
      result: [],
      message: 'Failed to delete record',
      status: 'error',
    }
  }

  // TODO: after delete rules
  return {
    table,
    cuid,
    result: [deleted],
    message: 'Successfully deleted record',
    status: 'success',
  }
}
export const List = {}
