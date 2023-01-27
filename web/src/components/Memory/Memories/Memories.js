import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import MemoriesCell from 'src/components/Memory/MemoriesCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Title',
    accessor: 'title',
    showMatching,
    filterOut,
    //dataType: 'timestamp',
    link: (givenId) => {
      return routes.memory({ cuid: givenId })
    },
  },

  {
    Header: 'Content',
    accessor: 'content',
    condensedLength: 80,
    showMatching,
    filterOut,
  },

  {
    Header: 'Active',
    accessor: 'active',
    showMatching,
    filterOut,
    dataType: 'boolean',
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

const MemoriesList = () => {
  let [orderBy, setOrderBy] = useState({ cuid: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState(/*{ entity: 'email' }*/) // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'memoryCreate',
    updateRecord: 'memoryUpdate',
    deleteRecord: 'memoryDelete',
  }
  return (
    <Fragment>
      <MemoriesCell
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

export default MemoriesList
