import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import { useForm } from 'react-hook-form'
import { Fragment } from 'react'

export const QUERY = gql`
  query EditPromptTrainingDataById($id: String!) {
    promptTrainingData: promptTrainingData(id: $id) {
      id
      createdAt
      updatedAt
      prompt
      table
      action
      type
      completion
      userId
    }
  }
`
const UPDATE_PROMPT_TRAINING_DATA_MUTATION = gql`
  mutation UpdatePromptTrainingDataMutation(
    $id: String!
    $input: UpdatePromptTrainingDataInput!
  ) {
    updatePromptTrainingData(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      prompt
      table
      action
      type
      completion
      userId
    }
  }
`
export const DELETE_PROMPT_TRAINING_DATA_MUTATION = gql`
  mutation DeletePromptTrainingDataMutation($id: Int!) {
    deletedRow: deletePromptTrainingData(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ promptTrainingData }) => {
  const [updatePromptTrainingData, { loading, error }] = useMutation(
    UPDATE_PROMPT_TRAINING_DATA_MUTATION,
    {
      onCompleted: () => {
        toast.success('PromptTrainingData updated')
        navigate(routes.promptTrainingDatas())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, promptTrainingData.id)
  }
  const onSave = (input, id) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId) })
    updatePromptTrainingData({ variables: { id, input: castInput } })
  }

  const [deletePromptTrainingData] = useMutation(
    DELETE_PROMPT_TRAINING_DATA_MUTATION,
    {
      onCompleted: () => {
        toast.success('PromptTrainingData deleted')
        navigate(routes.promptTrainingDatas())
      },
    }
  )

  const onDelete = (id) => {
    if (
      confirm('Are you sure you want to delete PromptTrainingData ' + id + '?')
    ) {
      deletePromptTrainingData({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'prompt',
      prettyName: 'Prompt',
      required: 'This is required',
    },
    {
      name: 'table',
      prettyName: 'Table',
      required: 'This is required',
    },
    {
      name: 'action',
      prettyName: 'Action',
      required: 'This is required',
    },
    {
      name: 'type',
      prettyName: 'Type',
      required: 'This is required',
    },
    {
      name: 'completion',
      prettyName: 'Completion',
      required: 'This is required',
    },
    {
      name: 'userId',
      prettyName: 'User id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // update the query above "EditPromptTrainingDataById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      // type: 'reference',
      // display: 'name',
      // value: 'id',
      // defaultValue: prompttrainingdata._referencedModelHere_.id,
      // defaultDisplay: prompttrainingdata._referencedModelHere_._displayColumn_,
      // QUERY: gql`
      //   query Find_referencedModelHere_FromPromptTrainingDatas(
      //     $filter: String
      //     $skip: Int
      //     $take: Int
      //   ) {
      //     search: _referencedPluralModelHere_(filter: $filter, skip: $skip, take: $take) {
      //       count
      //       take
      //       skip
      //       results {
      //         id
      //         name
      //       }
      //     }
      //   }
      // `,
    },
  ]

  const roles = {
    update: ['promptTrainingDataUpdate'],
    delete: ['promptTrainingDataDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`promptTrainingData.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={promptTrainingData}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.promptTrainingDatas()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}
