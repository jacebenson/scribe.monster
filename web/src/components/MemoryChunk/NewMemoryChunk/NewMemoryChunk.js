import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_MEMORY_CHUNK_MUTATION = gql`
  mutation CreateMemoryChunkMutation($input: CreateMemoryChunkInput!) {
    createMemoryChunk(input: $input) {
      cuid
    }
  }
`

const NewMemoryChunk = () => {
  const [createMemoryChunk, { loading, error }] = useMutation(
    CREATE_MEMORY_CHUNK_MUTATION,
    {
      onCompleted: () => {
        toast.success('MemoryChunk created')
        navigate(routes.memoryChunks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    console.log({ data })
    onSave(data)
  }

  const onSave = (input) => {
    createMemoryChunk({ variables: { input } })
  }
  const fields = [
    {
      name: 'title',
      prettyName: 'Title',
      required: 'This is required',
    },
    {
      name: 'content',
      prettyName: 'Content',
      required: 'This is required',
    },
    {
      name: 'active',
      prettyName: 'Active',
      defaultValue: 'true',
      type: 'boolean',
    },
    {
      name: 'memoryCuid',
      prettyName: 'Memory cuid',
      required: 'This is required',
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
        title="New MemoryChunk"
        description="New MemoryChunk form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
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

export default NewMemoryChunk
