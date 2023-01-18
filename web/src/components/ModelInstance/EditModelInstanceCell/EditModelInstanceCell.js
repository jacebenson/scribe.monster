import { Fragment, forwardRef } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

export const QUERY = gql`
  query EditModelInstanceById($id: String!) {
    modelInstance: modelInstance(id: $id) {
      id
      createdAt
      updatedAt
      name
      version
      description
      endpoint
      required
      cost
      price
      model
      prompt
      temperature
      maxTokens
      topP
      bestOf
      n
      stop
      frequencyPenalty
      presencePenalty
    }
  }
`
const UPDATE_MODEL_INSTANCE_MUTATION = gql`
  mutation UpdateModelInstanceMutation(
    $id: String!
    $input: UpdateModelInstanceInput!
  ) {
    updateModelInstance(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      version
      description
      endpoint
      required
      cost
      price
      model
      prompt
      temperature
      maxTokens
      topP
      bestOf
      n
      stop
      frequencyPenalty
      presencePenalty
    }
  }
`
export const DELETE_MODEL_INSTANCE_MUTATION = gql`
  mutation DeleteModelInstanceMutation($id: String!) {
    deletedRow: deleteModelInstance(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ modelInstance }) => {
  const [updateModelInstance, { loading, error }] = useMutation(
    UPDATE_MODEL_INSTANCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ModelInstance updated')
        navigate(routes.modelInstances())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    console.log({ function: 'onSubmit', data })
    onSave(data, modelInstance.id)
  }
  const onSave = async (input, id) => {
    console.log({ function: 'onSave', input })
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
    console.log({ function: 'onSave', castInput })
    updateModelInstance({ variables: { id, input: castInput } })
  }

  const [deleteModelInstance] = useMutation(DELETE_MODEL_INSTANCE_MUTATION, {
    onCompleted: () => {
      toast.success('ModelInstance deleted')
      navigate(routes.modelInstances())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDelete = async (id) => {
    console.log({ function: 'onDelete', id })
    if (confirm('Are you sure you want to delete ModelInstance ' + id + '?')) {
      deleteModelInstance({ variables: { id } })
    }
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
      required: 'This is required',
    },
    {
      name: 'description',
      prettyName: 'Description',
      required: 'This is required',
    },
    {
      name: 'endpoint',
      prettyName: 'Endpoint',
      required: 'This is required',
    },
    {
      name: 'required',
      prettyName: 'Required from the api',
      required: 'This is required',
    },
    {
      name: 'cost',
      prettyName: 'Cost',
      required: 'This is required',
    },
    {
      name: 'price',
      prettyName: 'Price',
      required: 'This is required',
    },
    {
      name: 'model',
      prettyName: 'Model',
      required: 'This is required',
    },
    {
      name: 'prompt',
      prettyName: 'Prompt',
      required: 'This is required',
      type: 'editor',
      rows: 10,
      height: '10vh',
    },
    {
      name: 'temperature',
      prettyName: 'Temperature',
      required: 'This is required',
      type: 'number',
    },
    {
      name: 'maxTokens',
      prettyName: 'Max tokens',
      required: 'This is required',
      type: 'number',
    },
    {
      name: 'topP',
      prettyName: 'Top p',
      required: 'This is required',
      type: 'number',
    },
    {
      name: 'bestOf',
      prettyName: 'Best of',
      required: 'This is required',
      type: 'select',
      options: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20,
      ],
    },
    {
      name: 'n',
      prettyName: 'N',
      required: 'This is required',
      type: 'number',
    },
    {
      name: 'stop',
      prettyName: 'Stop',
      required: 'This is required',
    },
    {
      name: 'frequencyPenalty',
      prettyName: 'Frequency penalty',
      required: 'This is required',
      type: 'number',
    },
    {
      name: 'presencePenalty',
      prettyName: 'Presence penalty',
      required: 'This is required',
      type: 'number',
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
        title={`modelInstance.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        key={`${modelInstance.id}-form`}
        record={modelInstance}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
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
