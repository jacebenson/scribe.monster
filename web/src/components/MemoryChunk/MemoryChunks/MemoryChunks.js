import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import MemoryChunksCell from 'src/components/MemoryChunk/MemoryChunksCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Title',
    accessor: 'title',
    showMatching,
    filterOut,
    link: (givenId) => {
      return routes.memoryChunk({ cuid: givenId })
    },
  },

  {
    Header: 'Active',
    accessor: 'active',
    showMatching,
    filterOut,
    dataType: 'boolean',
  },

  {
    Header: 'Memory cuid',
    accessor: 'memoryCuid',
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

const MemoryChunksList = () => {
  let [orderBy, setOrderBy] = useState({ cuid: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState(/*{ entity: 'email' }*/) // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'memorychunkCreate',
    updateRecord: 'memorychunkUpdate',
    deleteRecord: 'memorychunkDelete',
  }
  return (
    <Fragment>
      <MemoryChunksCell
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

export default MemoryChunksList
