import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

export const QUERY = gql`
  query EditLogById($cuid: String!) {
    log: log(cuid: $cuid) {
      cuid
      createdAt
      message
      source
      context
    }
  }
`
const UPDATE_LOG_MUTATION = gql`
  mutation UpdateLogMutation($cuid: String!, $input: UpdateLogInput!) {
    updateLog(cuid: $cuid, input: $input) {
      cuid
      createdAt
      message
      source
      context
    }
  }
`
export const DELETE_LOG_MUTATION = gql`
  mutation DeleteLogMutation($cuid: String!) {
    deletedRow: deleteLog(cuid: $cuid) {
      cuid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ log }) => {
  const [updateLog, { loading, error }] = useMutation(UPDATE_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('Log updated')
      navigate(routes.logs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    onSave(data, log.cuid)
  }
  const onSave = (input, cuid) => {
    updateLog({ variables: { cuid, input } })
  }

  const [deleteLog] = useMutation(DELETE_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('Log deleted')
      navigate(routes.logs())
    },
  })

  const onDelete = (cuid) => {
    if (confirm('Are you sure you want to delete Log ' + cuid + '?')) {
      deleteLog({ variables: { cuid } })
    }
  }
  const fields = [
    {
      name: 'createdAt',
      prettyName: 'Created At',
      required: 'This is required',
    },
    {
      name: 'message',
      prettyName: 'Message',
      required: 'This is required',
    },
    {
      name: 'source',
      prettyName: 'Source',
      required: 'This is required',
    },
    {
      name: 'context',
      prettyName: 'Context',
      required: 'This is required',
      type: 'json',
    },
  ]

  const roles = {
    update: ['logUpdate'],
    delete: ['logDelete'],
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`log.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={log}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.logs()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      >
        <></>
      </FormComponent>
    </Fragment>
  )
}
