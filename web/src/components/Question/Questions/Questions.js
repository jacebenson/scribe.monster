import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import QuestionsCell from 'src/components/Question/QuestionsCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Cuid',
    accessor: 'cuid',
    showMatching,
    filterOut,
    link: (givenId) => {
      return routes.question({ cuid: givenId })
    },
  },

  {
    Header: 'Created at',
    accessor: 'createdAt',
    showMatching,
    filterOut,
    dataType: 'timestamp',
  },

  //  {
  //    Header: 'Updated at',
  //    accessor: 'updatedAt',
  //    showMatching,
  //    filterOut,
  //    dataType: 'timestamp',
  //  },

  {
    Header: 'User cuid',
    accessor: 'userCuid',
    showMatching,
    filterOut,
  },

  {
    Header: 'State',
    accessor: 'state',
    showMatching,
    filterOut,
  },

  {
    Header: 'Text',
    accessor: 'text',
    showMatching,
    filterOut,
  },

  //  {
  //    Header: 'Text vector',
  //    accessor: 'textVector',
  //    showMatching,
  //    filterOut,
  //  },

  {
    Header: 'Rephrased text',
    accessor: 'rephrasedText',
    showMatching,
    filterOut,
  },

  //  {
  //    Header: 'Rephrased text vector',
  //    accessor: 'rephrasedTextVector',
  //    showMatching,
  //    filterOut,
  //  },

  {
    Header: 'Answer',
    accessor: 'answer',
    showMatching,
    filterOut,
  },

  {
    Header: 'Answered at',
    accessor: 'answeredAt',
    showMatching,
    filterOut,
    dataType: 'timestamp',
  },

  //  {
  //    Header: 'Answered by',
  //    accessor: 'answeredBy',
  //    showMatching,
  //    filterOut,
  //  },

  {
    Header: 'Active',
    accessor: 'active',
    showMatching,
    filterOut,
    dataType: 'boolean',
  },

  //  {
  //    Header: 'Thread cuid',
  //    accessor: 'threadCuid',
  //    showMatching,
  //    filterOut,
  //  },

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

const QuestionsList = () => {
  let [orderBy, setOrderBy] = useState({ cuid: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState(/*{ entity: 'email' }*/) // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'questionCreate',
    updateRecord: 'questionUpdate',
    deleteRecord: 'questionDelete',
  }
  return (
    <Fragment>
      <QuestionsCell
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

export default QuestionsList
