import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import ScribeRequestsCell from 'src/components/ScribeRequest/ScribeRequestsCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  //{
  //  Header: 'Id',
  //  accessor: 'id',
  //  showMatching,
  //  filterOut,
  //  dataType: 'string',
  //  link: (givenId) => {
  //    return routes.scribeRequest({ id: givenId })
  //  },
  //},
  {
    Header: 'When',
    accessor: 'createdAt',
    showMatching,
    filterOut,
    dataType: 'timestamp',
    link: (givenId) => {
      return routes.scribeRequest({ id: givenId })
    },
  },

  {
    Header: 'User',
    accessor: 'user',
    showMatching,
    filterOut,
    canSort: false,
    reference: true,
    model: 'user',
    field: 'name',
    link: (givenId) => {
      //  // e.g. return routes._insertPluralModelHere_({ q: {"id": givenId}})
      //  // e.g. return routes.users({ q: `{"id": }` })// link to a list w/the query
      return routes.user({ id: givenId }) // link to the record
    },
  },

  {
    Header: 'Model',
    accessor: 'modelInstance',
    showMatching,
    filterOut,
    canSort: false,
    reference: true,
    model: 'modelInstance',
    field: 'name',
    link: (givenId) => {
      //  // e.g. return routes._insertPluralModelHere_({ q: {"id": givenId}})
      //  // e.g. return routes.users({ q: `{"id": }` })// link to a list w/the query
      return routes.modelInstance({ id: givenId }) // link to the record
    },
  },
  {
    Header: 'Tokens',
    accessor: 'totalTokens',
    showMatching,
    filterOut,
  },

  {
    Header: 'Actions',
    accessor: 'actions',
    canSort: false,
    canRemove: false,
    canReset: true,
    canExport: true,
    canSetTake: true,
  },
]

const ScribeRequestsList = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState(/*{ entity: 'email' }*/) // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'scriberequestCreate',
    updateRecord: 'scriberequestUpdate',
    deleteRecord: 'scriberequestDelete',
  }
  return (
    <Fragment>
      <ScribeRequestsCell
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        columns={columns}
        setColumns={setColumns}
        initialColumns={initialColumns}
        take={take}
        setTake={setTake}
        skip={skip}
        setSkip={setSkip}
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        displayColumn="id"
        roles={roles}
      />
    </Fragment>
  )
}

export default ScribeRequestsList