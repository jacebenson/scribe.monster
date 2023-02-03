import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import { useForm } from 'react-hook-form'
import { Fragment } from 'react'

export const QUERY = gql`
  query EditThreadById($cuid: String!) {
    thread: thread(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      userCuid
    }
  }
`
const UPDATE_THREAD_MUTATION = gql`
  mutation UpdateThreadMutation($cuid: String!, $input: UpdateThreadInput!) {
    updateThread(cuid: $cuid, input: $input) {
      cuid
      createdAt
      updatedAt
      userCuid
    }
  }
`
export const DELETE_THREAD_MUTATION = gql`
  mutation DeleteThreadMutation($cuid: String!) {
    deletedRow: deleteThread(cuid: $cuid) {
      cuid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ thread }) => {
  const [updateThread, { loading, error }] = useMutation(
    UPDATE_THREAD_MUTATION,
    {
      onCompleted: () => {
        toast.success('Thread updated')
        navigate(routes.threads())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, thread.id)
  }
  const onSave = (input, cuid) => {
    updateThread({ variables: { cuid, input } })
  }

  const [deleteThread] = useMutation(DELETE_THREAD_MUTATION, {
    onCompleted: () => {
      toast.success('Thread deleted')
      navigate(routes.threads())
    },
  })

  const onDelete = (cuid) => {
    if (confirm('Are you sure you want to delete Thread ' + cuid + '?')) {
      deleteThread({ variables: { cuid } })
    }
  }
  const fields = [
    {
      name: 'userCuid',
      prettyName: 'User cuid',
    },
  ]

  const roles = {
    update: ['threadUpdate'],
    delete: ['threadDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`thread.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={thread}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.threads()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}
