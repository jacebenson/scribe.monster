import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_MODEL_INSTANCE_MUTATION = gql`
  mutation CreateModelInstanceMutation($input: CreateModelInstanceInput!) {
    createModelInstance(input: $input) {
      id
    }
  }
`

const NewModelInstance = () => {
  const [createModelInstance, { loading, error }] = useMutation(
    CREATE_MODEL_INSTANCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ModelInstance created')
        navigate(routes.modelInstances())
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
    const castInput = Object.assign(input, {
      version: parseInt(input.version),
      cost: parseFloat(input.cost),
      price: parseFloat(input.price),
      temperature: parseFloat(input.temperature),
      maxTokens: parseInt(input.maxTokens),
      topP: parseInt(input.topP),
      bestOf: parseInt(input.bestOf),
      n: parseInt(input.n),
      frequencyPenalty: parseFloat(input.frequencyPenalty),
      presencePenalty: parseFloat(input.presencePenalty),
    })
    createModelInstance({ variables: { input: castInput } })
  }
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',

      required: 'This is required',
    },
    {
      name: 'version',
      prettyName: 'Version',
      defaultValue: '1',
      required: 'This is required',
    },
    {
      name: 'description',
      prettyName: 'Description',
      defaultValue: 'This action',
      required: 'This is required',
    },
    {
      name: 'endpoint',
      prettyName: 'Endpoint',
      defaultValue: 'https://api.openai.com/v1/completions',
      required: 'This is required',
    },
    {
      name: 'required',
      prettyName: 'Required',
      defaultValue: 'action, input',
      required: 'This is required',
    },
    {
      name: 'cost',
      prettyName: 'Cost',
      defaultValue: '0.02',
      required: 'This is required',
    },
    {
      name: 'price',
      prettyName: 'Price',
      defaultValue: '0.2',
      required: 'This is required',
    },
    {
      name: 'model',
      prettyName: 'Model',
      defaultValue: 'text-davinci-002',
      required: 'This is required',
    },
    {
      name: 'prompt',
      prettyName: 'Prompt',

      required: 'This is required',
    },
    {
      name: 'temperature',
      prettyName: 'Temperature',
      defaultValue: '0.7',
      required: 'This is required',
    },
    {
      name: 'maxTokens',
      prettyName: 'Max tokens',
      defaultValue: '500',
      required: 'This is required',
    },
    {
      name: 'topP',
      prettyName: 'Top p',
      defaultValue: '1',
      required: 'This is required',
    },
    {
      name: 'bestOf',
      prettyName: 'Best of',
      defaultValue: '1',
      required: 'This is required',
    },
    {
      name: 'n',
      prettyName: 'N',
      defaultValue: '1',
      required: 'This is required',
    },
    {
      name: 'stop',
      prettyName: 'Stop',
      defaultValue: 'END',
      required: 'This is required',
    },
    {
      name: 'frequencyPenalty',
      prettyName: 'Frequency penalty',
      defaultValue: '0',
      required: 'This is required',
    },
    {
      name: 'presencePenalty',
      prettyName: 'Presence penalty',
      defaultValue: '0',
      required: 'This is required',
    },
  ]

  const roles = {
    update: ['modelInstanceUpdate'],
    delete: ['modelInstanceDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title="New ModelInstance"
        description="New ModelInstance form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        returnLink={routes.modelInstances()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

export default NewModelInstance
