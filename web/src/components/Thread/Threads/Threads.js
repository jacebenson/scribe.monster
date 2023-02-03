import { routes } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import ThreadsCell from 'src/components/Thread/ThreadsCell'
import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Cuid',
    accessor: 'cuid',
    showMatching,
    filterOut,
    link: (givenId) => {
      return routes.thread({ cuid: givenId })
    },
  },

  {
    Header: 'Created at',
    accessor: 'createdAt',
    showMatching,
    filterOut,
    dataType: 'timestamp',
  },

  {
    Header: 'Updated at',
    accessor: 'updatedAt',
    showMatching,
    filterOut,
    dataType: 'timestamp',
  },

  {
    Header: 'User cuid',
    accessor: 'userCuid',
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

const ThreadsList = () => {
  let [orderBy, setOrderBy] = useState({ cuid: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState(/*{ entity: 'email' }*/) // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'threadCreate',
    updateRecord: 'threadUpdate',
    deleteRecord: 'threadDelete',
  }
  return (
    <Fragment>
      <ThreadsCell
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

export default ThreadsList
