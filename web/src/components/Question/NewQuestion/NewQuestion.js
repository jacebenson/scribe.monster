import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestionMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      cuid
    }
  }
`

const NewQuestion = () => {
  const [createQuestion, { loading, error }] = useMutation(
    CREATE_QUESTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Question created')
        navigate(routes.questions())
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
    createQuestion({ variables: { input } })
  }
  const fields = [
    {
      name: 'userCuid',
      prettyName: 'User cuid',
    },
    {
      name: 'state',
      prettyName: 'State',
      defaultValue: 'open',
      required: 'This is required',
    },
    {
      name: 'text',
      prettyName: 'Text',

      required: 'This is required',
    },

    {
      name: 'rephrasedText',
      prettyName: 'Rephrased text',
    },
    {
      name: 'rephrasedTextVector',
      prettyName: 'Rephrased text vector',
    },
    {
      name: 'context',
      prettyName: 'Context',
    },
    {
      name: 'answer',
      prettyName: 'Answer',
    },
    {
      name: 'answeredAt',
      prettyName: 'Answered at',
    },
    {
      name: 'answeredBy',
      prettyName: 'Answered by',
      defaultValue: 'stew',
    },
    {
      name: 'active',
      prettyName: 'Active',
      defaultValue: 'true',
      type: 'boolean',
    },
    {
      name: 'threadCuid',
      prettyName: 'Thread cuid',

      required: 'This is required',
    },
  ]

  const roles = {
    update: ['questionUpdate'],
    delete: ['questionDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title="New Question"
        description="New Question form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        returnLink={routes.questions()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

export default NewQuestion
