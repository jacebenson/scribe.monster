import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

export const QUERY = gql`
  query EditMemoryChunkById($cuid: String!) {
    memoryChunk: memoryChunk(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      content
      vector
      active
      title
      memoryCuid
    }
  }
`
const UPDATE_MEMORY_CHUNK_MUTATION = gql`
  mutation UpdateMemoryChunkMutation(
    $cuid: String!
    $input: UpdateMemoryChunkInput!
  ) {
    updateMemoryChunk(cuid: $cuid, input: $input) {
      cuid
      createdAt
      updatedAt
      content
      vector
      active
      title
      memoryCuid
    }
  }
`
export const DELETE_MEMORY_CHUNK_MUTATION = gql`
  mutation DeleteMemoryChunkMutation($cuid: String!) {
    deletedRow: deleteMemoryChunk(cuid: $cuid) {
      cuid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ memoryChunk }) => {
  const [updateMemoryChunk, { loading, error }] = useMutation(
    UPDATE_MEMORY_CHUNK_MUTATION,
    {
      onCompleted: () => {
        toast.success('MemoryChunk updated')
        navigate(routes.memoryChunks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    delete data.__memoryLink
    onSave(data, memoryChunk.id)
  }
  const onSave = (input, cuid) => {
    updateMemoryChunk({ variables: { cuid, input } })
  }

  const [deleteMemoryChunk] = useMutation(DELETE_MEMORY_CHUNK_MUTATION, {
    onCompleted: () => {
      toast.success('MemoryChunk deleted')
      navigate(routes.memoryChunks())
    },
  })

  const onDelete = (cuid) => {
    if (confirm('Are you sure you want to delete MemoryChunk ' + cuid + '?')) {
      deleteMemoryChunk({ variables: { cuid } })
    }
  }
  const fields = [
    {
      name: 'content',
      prettyName: 'Content',
      required: 'This is required',
      type: 'textarea',
    },
    {
      name: 'vector',
      prettyName: 'Vector',
    },
    {
      name: 'active',
      prettyName: 'Active',
      type: 'boolean',
    },
    {
      name: 'title',
      prettyName: 'Title',
      required: 'This is required',
    },
    //{
    //  name: 'memoryCuid',
    //  prettyName: 'Memory',
    //  required: 'This is required',
    //},
    {
      name: '__memoryLink',
      prettyName: 'Memory',
      to: 'memory',
      record: { cuid: memoryChunk.memoryCuid },
      required: 'This is required',
      type: 'link',
    },
  ]

  const roles = {
    update: ['memoryChunkUpdate'],
    delete: ['memoryChunkDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`memoryChunk.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={memoryChunk}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.memoryChunks()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}
