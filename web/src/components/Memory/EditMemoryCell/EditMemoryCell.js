import { Fragment, useState } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

export const QUERY = gql`
  query EditMemoryById($cuid: String!) {
    memory: memory(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      content
      vector
      active
      title
      source
      sourceUrl
    }
  }
`
const UPDATE_MEMORY_MUTATION = gql`
  mutation UpdateMemoryMutation($cuid: String!, $input: UpdateMemoryInput!) {
    updateMemory(cuid: $cuid, input: $input) {
      cuid
      createdAt
      updatedAt
      content
      vector
      active
      title
      source
      sourceUrl
    }
  }
`
export const DELETE_MEMORY_MUTATION = gql`
  mutation DeleteMemoryMutation($cuid: String!) {
    deletedRow: deleteMemory(cuid: $cuid) {
      cuid
    }
  }
`
export const beforeQuery = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return {
    variables: {
      ...props,
    },
    fetchPolicy: 'no-cache',
  }
}

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)
export const Success = ({ memory }) => {
  let loadedLines = memory.content.split('\n').length
  let [contentRows, setContentRows] = useState(loadedLines)

  const [updateMemory, { loading, error }] = useMutation(
    UPDATE_MEMORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Memory updated')
        navigate(routes.memories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, memory.cuid)
  }
  const onSave = (input, cuid) => {
    updateMemory({ variables: { cuid, input } })
  }

  const [deleteMemory] = useMutation(DELETE_MEMORY_MUTATION, {
    onCompleted: () => {
      toast.success('Memory deleted')
      navigate(routes.memories())
    },
  })

  const onDelete = (/*cuid*/) => {
    if (
      confirm(
        'Are you sure you want to delete Memory ' +
          memory.content.substring(0, 10) +
          '?'
      )
    ) {
      deleteMemory({ variables: { cuid: memory.cuid } })
    }
  }

  const fields = [
    {
      name: 'title',
      prettyName: 'Title',
    },
    {
      name: 'sourceUrl',
      prettyName: 'Source URL',
    },
    {
      name: 'source',
      prettyName: 'Source',
    },
    {
      name: 'content',
      prettyName: 'Content',
      type: 'textarea',
      required: 'This is required',
      rows: contentRows,
      placeholder: 'Enter your content here',
      spellCheck: 'false',
    },
    //{
    //  name: 'vector',
    //  prettyName: 'Vector',
    //},
    {
      name: 'active',
      prettyName: 'Active',
      type: 'boolean',
    },
  ]

  const roles = {
    update: ['memoryUpdate'],
    delete: ['memoryDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`memory.cuid`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={memory}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.memories()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}
