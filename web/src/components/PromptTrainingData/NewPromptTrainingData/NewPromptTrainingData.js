import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import FormComponent from 'src/components/FormComponent'

const CREATE_PROMPT_TRAINING_DATA_MUTATION = gql`
  mutation CreatePromptTrainingDataMutation(
    $input: CreatePromptTrainingDataInput!
  ) {
    createPromptTrainingData(input: $input) {
      id
    }
  }
`

const NewPromptTrainingData = () => {
  const [createPromptTrainingData, { loading, error }] = useMutation(
    CREATE_PROMPT_TRAINING_DATA_MUTATION,
    {
      onCompleted: () => {
        toast.success('PromptTrainingData created')
        navigate(routes.promptTrainingDatas())
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
    const castInput = Object.assign(input, { userId: parseInt(input.userId) })
    createPromptTrainingData({ variables: { input: castInput } })
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
      // uncomment and edit below to your needs
      // type: 'reference',
      // display: 'name',
      // value: 'id',
      // QUERY: gql`
      //   query FinduserIdHereFromPromptTrainingDatas(
      //     $filter: String
      //     $skip: Int
      //   ) {
      //     search: removethisdot.referencedPluralModelHere(filter: $filter, skip: $skip) {
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
        title="New PromptTrainingData"
        description="New PromptTrainingData form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
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

export default NewPromptTrainingData
