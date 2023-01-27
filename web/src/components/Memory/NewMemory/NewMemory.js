import { Fragment, useState } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_MEMORY_MUTATION = gql`
  mutation CreateMemoryMutation($input: CreateMemoryInput!) {
    createMemory(input: $input) {
      cuid
    }
  }
`
const NewMemory = () => {
  let [characters, setCharacters] = useState(0)
  let [tokens, setTokens] = useState(0)
  let [contentRows, setContentRows] = useState(0)
  const [createMemory, { loading, error }] = useMutation(
    CREATE_MEMORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Memory created')
        navigate(routes.memories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data)
  }

  const onSave = (input) => {
    createMemory({ variables: { input } })
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
      type: 'textarea',
      required: 'This is required',
      rows: contentRows,
      onChange: (e) => {
        setCharacters(e.target.value.length)
        setTokens(Math.floor(e.target.value.length / 4))
        const height = Math.floor(e.target.scrollHeight / 22)
        setContentRows(height)
        //setContentRows(e.target.value.split('\n').length)
      },
      countCharacters: characters,
      countTokens: tokens,
      spellCheck: 'false',
    },
    {
      name: 'vector',
      prettyName: 'Vector',
    },
    {
      name: 'active',
      prettyName: 'Active',
      defaultValue: 'true',
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
        title="New Memory"
        description="New Memory form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
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

export default NewMemory
