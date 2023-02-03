import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

export const QUERY = gql`
  query EditQuestionById($cuid: String!) {
    question: question(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      userCuid
      state
      text
      rephrasedText
      rephrasedTextVector
      context
      answer
      answeredAt
      answeredBy
      active
      threadCuid
    }
  }
`
const UPDATE_QUESTION_MUTATION = gql`
  mutation UpdateQuestionMutation(
    $cuid: String!
    $input: UpdateQuestionInput!
  ) {
    updateQuestion(cuid: $cuid, input: $input) {
      cuid
      createdAt
      updatedAt
      userCuid
      state
      text
      rephrasedText
      rephrasedTextVector
      context
      answer
      answeredAt
      answeredBy
      active
      threadCuid
    }
  }
`
export const DELETE_QUESTION_MUTATION = gql`
  mutation DeleteQuestionMutation($cuid: String!) {
    deletedRow: deleteQuestion(cuid: $cuid) {
      cuid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ question }) => {
  const [updateQuestion, { loading, error }] = useMutation(
    UPDATE_QUESTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Question updated')
        navigate(routes.questions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, question.id)
  }
  const onSave = (input, cuid) => {
    updateQuestion({ variables: { cuid, input } })
  }

  const [deleteQuestion] = useMutation(DELETE_QUESTION_MUTATION, {
    onCompleted: () => {
      toast.success('Question deleted')
      navigate(routes.questions())
    },
  })

  const onDelete = (cuid) => {
    if (confirm('Are you sure you want to delete Question ' + cuid + '?')) {
      deleteQuestion({ variables: { cuid } })
    }
  }
  const fields = [
    {
      name: 'userCuid',
      prettyName: 'User cuid',
    },
    {
      name: 'state',
      prettyName: 'State',
      required: 'This is required',
    },
    {
      name: 'text',
      prettyName: 'Text',
      required: 'This is required',
    },
    {
      name: 'rephrasedText',
      prettyName: 'Rephrased text',
    },
    {
      name: 'rephrasedTextVector',
      prettyName: 'Rephrased text vector',
    },
    {
      name: 'context',
      prettyName: 'Context',
    },
    {
      name: 'answer',
      prettyName: 'Answer',
    },
    {
      name: 'answeredAt',
      prettyName: 'Answered at',
    },
    {
      name: 'answeredBy',
      prettyName: 'Answered by',
    },
    {
      name: 'active',
      prettyName: 'Active',
      type: 'boolean',
    },
    {
      name: 'threadCuid',
      prettyName: 'Thread cuid',
      required: 'This is required',
    },
  ]

  const roles = {
    update: ['questionUpdate'],
    delete: ['questionDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`question.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={question}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.questions()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}
