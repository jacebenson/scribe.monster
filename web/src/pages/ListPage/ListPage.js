//import { Link, routes } from '@redwoodjs/router'
import { Fragment, useEffect, useState } from 'react'
import {
  //SimpleGrid,
  Table,
  TableCaption,
  Heading,
  Th,
  Tr,
  Thead,
  Td,
  Tbody,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react'
import { MdSortByAlpha } from 'react-icons/md'
import camelCase from 'camelcase'
import { getRecords, getSchema, readManyGQL } from 'src/lib/atomicFunctions'
import { useAuth } from 'src/auth'
import { MetaTags } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { tableNames } from 'src/lib/atomicFunctions'

let transformData = ({ data, schema }) => {
  // look at the schema and if the type is DateTime
  // convert it to a date
  //console.log('transformData', { data })
  schema.fields.forEach((field) => {
    if (field.type === 'DateTime') {
      data.forEach((row) => {
        let value = row[field.name]
        if (!value) row[field.name] = ''
        if (value) row[field.name] = new Date(value).toLocaleString()
      })
    }
  })
  return data
}
const ListPage = ({ table, params }) => {
  console.log({ table, params })

  // params may be undefined or may be a string seperated by `/`
  // if it is a string, convert it to an object
  if (params && typeof params === 'string') {
    // lets split out the where, q, filter, and orderBy
    //let where = params.split('where/')[1]
    let orderBy = false
    let where = false
    //let orderBy = params.split('orderBy/')[1]
    // now lets split out the rest of the params
    // url will always be in /key/value/key/value/orderBy/.../where/...
    // url may not include orderBy or where
    // lets split out the rest of the params
    let paramsArray = params.split('/')
    let paramsObject = {}




    paramsArray.forEach((param, index) => {
      // if the param is "where" or "q" or "filter" or "orderBy"
      // then it takes more than one thing.
      // orderBy takes a field and direction
      // where, q, and filter take the rest of the params
      if (param === 'where') {
        // the value is all the rest of the params
        let whereValue = paramsArray.slice(index + 1).join('/')
        // we need to loop the value and convert it to an object
        // the value will be in the format of key/operator/value/key/operator/value
        let whereArray = whereValue.split('/')
        let whereObject = {}
        var operators = [
          ['is', 'equals'],
          ['isNot', 'not'],
          ['equals', 'equals'],
          ['not', 'not'],
          ['in', 'in'],
          ['notIn', 'notIn'],
          ['contains', 'contains'],
          ['startsWith', 'startsWith'],
          ['endsWith', 'endsWith'],
          ['lt', 'lt'],
          ['lte', 'lte'],
          ['gt', 'gt'],
          ['gte', 'gte']
        ]

        whereArray.forEach((param, index) => {
          // if not divisible by 3, then it is not a valid where
          if (whereArray.length % 3 !== 0) {
            console.error(`Invalid where: ${whereValue}`)
            return
          }
          if (index % 3 === 0) {
            let key = param
            let operator = whereArray[index + 1]
            // we need to convert the operator to the correct operator
            operators.forEach((operatorArray) => {
              if (operatorArray[0] === operator) operator = operatorArray[1]
            })
            let value = whereArray[index + 2]
            // now we need to do some formatting of the value for boolean and numbers
            if (value === 'true') value = true
            if (value === 'false') value = false
            if (!isNaN(value)) value = Number(value)
            // if value is a string, decode it
            if (typeof value === 'string') value = decodeURIComponent(value)
            // if key does not contain a dot, then it is a field
            if (!key.includes('.')) {
              whereObject[key] = { [operator]: value }
            }
            // if key contains a dot, then it is a relation
            // we need to convert it to the correct format
            if (key.includes('.')) {
              let relation = key.split('.')[0]
              let field = key.split('.')[1]
              whereObject[relation] = { [field]: { [operator]: value } }
            }
            //console.log({ key, operator, value })

          }
        })
        where = whereObject

      }
      if (param === 'orderBy') {
        // the next two params are the field and direction
        let field = paramsArray[index + 1]
        let direction = paramsArray[index + 2]
        // if direction is not asc or desc, then it is not a valid orderBy
        // console.log the error and return and assume desc
        if (direction !== 'asc' && direction !== 'desc') {
          console.error(
            `Invalid orderBy direction: ${direction}. Must be asc or desc.`
          )
          direction = 'desc'
        }
        orderBy = { [field]: direction }
      }
      // the rest of the params are just key value pairs
      let value = paramsArray[index + 1]
      // convert the value to a number if it is a number
      // convert the value to a boolean if it is a boolean
      if (!isNaN(value)) value = Number(value)
      if (value === 'true') value = true
      if (value === 'false') value = false
      // if param is a number, exclude it
      if (!isNaN(param)) return
      if (param) paramsObject[param] = value
      if (orderBy) {
        paramsObject.orderBy = orderBy
      }
      if (where) {
        paramsObject.q = JSON.stringify(where)
      }

    })
    params = paramsObject
  }
  console.log({ params })
  let variables = {}
  // if any of the "variables" are in the params, move them to the variables
  if (params?.take || params?.skip || params?.orderBy || params?.filter || params?.q || params?.page || params?.where) {
    if (params?.take) variables.take = params.take
    if (params?.skip) variables.skip = params.skip
    if (params?.page) {
      let skip = (params?.page - 1) * (params?.take || 10)
      variables.skip = skip
    }
    if (params?.orderBy) variables.orderBy = params.orderBy
    if (params?.filter) variables.filter = params.filter
    if (params?.q) variables.q = params.q
    if (params?.where) variables.where = params.where
  }
  const { getToken } = useAuth()
  let { camelTable, pascalTable, pluralTable, spacedTable } = tableNames({ table })
  let [schema, setSchema] = useState()
  let [rows, setRows] = useState()
  let [count, setCount] = useState(0)
  let [listState, setListState] = useState('loading')
  let [error, setError] = useState()
  useEffect(() => {
    setError(null)
    setRows([])//clear the rows when the table changes
    setCount(0)//clear the count when the table changes
    setListState('loading')//clear the listState when the table changes
    getSchema({ table: pascalTable })
      .then(async (database) => {
        // filter the schema to only include the table
        setSchema(database.schema)
        //console.log('database.schema', database.schema)
        let token = await getToken()
        getRecords({ table: camelTable, schema: database.schema, token, variables }).then(
          (data) => {
            if (data.errors) {
              setListState('error')
              setError(data.errors)
              return
            }
            let results = data.data[pluralTable].results
            let count = data.data[pluralTable].count
            transformData({ data: results, schema: database.schema })
            setCount(count)
            setRows(results)
            setListState('loaded')
          }
        )
      })
      .catch((error) => {
        setError(error.message)
        console.error('error', error)
      })
  }, [table])

  if (listState === 'error') {
    return <p>ERROR: {JSON.stringify(error)}</p>
  }
  if (listState === 'loading') {
    return <p>Loading...</p>
  }
  return (
    <Fragment>
      <MetaTags title="List" description="List page" />

      <Heading pb={2}>
        {spacedTable} ({count})
      </Heading>
      {error && <p>ERROR: {JSON.stringify(error)}</p>}
      {!error && !schema && <p>Loading...</p>}
      {!error && schema && !rows && <p>Loading...</p>}
      {!error && schema && rows && (
        <Table key={'table'} variant="striped" colorScheme={'green'} size="xs">
          <TableCaption key={'tc'}>List of {table}</TableCaption>
          <Thead key={'thead'}>
            <Tr key={`${table}.heading`}>
              {schema &&
                schema.fields &&
                schema.fields.map((field, index) => {
                  let header = field?.definition?.label || field.name
                  let sortable = field?.definition?.canSort
                  return <Th key={`${table}.${field.name}`}>
                    {header}
                    {sortable && <Icon as={MdSortByAlpha} />}
                  </Th>
                })}
            </Tr>
          </Thead>
          <Tbody key={'tbody'}>
            {rows &&
              rows.map((row, rowIndex) => {
                return (
                  <Tr key={row.cuid}>
                    {schema &&
                      schema.fields &&
                      schema.fields.map((field, fieldIndex) => {
                        let key = `${table}.${field.name}.${row.cuid}`
                        let font = field?.definition?.fontFamily
                        let reference = field?.reference && field?.definition?.display && field?.definition?.value
                        let referenceCuid = row?.[field.name]?.[field.definition.value]
                        let genericFormLink = routes.formEdit({ table: camelTable, cuid: row.cuid })
                        if (fieldIndex === 0) {
                          return (<Td key={key}>
                            {/*<ChakraLink as={Link} to={routes[camelTable]({cuid: row.cuid})} fontFamily={font}>
                              {row[field.name]}
                            </ChakraLink>*/}
                            <ChakraLink as={Link} to={genericFormLink} fontFamily={font}>
                              {row[field.name]}
                            </ChakraLink>
                          </Td>)
                        }
                        if (reference && referenceCuid) {
                          let referenceTable = camelCase(field.name, { pascalCase: false })
                          return (<Td key={key}>
                            <ChakraLink as={Link} to={routes[referenceTable]({ cuid: referenceCuid })} fontFamily={font}>
                              {row[field.name][field.definition.display]}
                            </ChakraLink>
                          </Td>)
                        }
                        return <Td key={key}>{row[field.name]}</Td>
                      })}
                  </Tr>
                )
              })}
          </Tbody>
          {/*
        <TableColumns
          columns={columns}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setColumns={setColumns}
          initialColumns={initialColumns}
          setTake={setTake}
        />

        <TableRows
          columns={columns}
          roles={roles}
          setData={setData}
          data={data}
          model="groups"
          deleteMutation={DELETE_GROUP_MUTATION}
          displayColumn={displayColumn}
        />
              */}
        </Table>
      )}
      {/*
      <Center>
        <TablePagination
          count={data.count}
          skip={skip}
          setSkip={setSkip}
          take={take}
        />
      </Center>
*/}
      <details>
        <summary>Schema</summary>
        <pre>{JSON.stringify(schema, null, ' ')}</pre>
      </details>
    </Fragment>
  )
}

export default ListPage