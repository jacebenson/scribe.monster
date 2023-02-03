import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import FormComponent from 'src/components/FormComponent'

const CREATE_THREAD_MUTATION = gql`
  mutation CreateThreadMutation($input: CreateThreadInput!) {
    createThread(input: $input) {
      cuid
    }
  }
`

const NewThread = () => {
  const [createThread, { loading, error }] = useMutation(
    CREATE_THREAD_MUTATION,
    {
      onCompleted: () => {
        toast.success('Thread created')
        navigate(routes.threads())
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
    createThread({ variables: { input } })
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
        title="New Thread"
        description="New Thread form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
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

export default NewThread
