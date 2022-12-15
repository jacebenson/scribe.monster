import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_SCRIBE_REQUEST_MUTATION = gql`
  mutation CreateScribeRequestMutation($input: CreateScribeRequestInput!) {
    createScribeRequest(input: $input) {
      id
    }
  }
`

const NewScribeRequest = () => {
  const [createScribeRequest, { loading, error }] = useMutation(
    CREATE_SCRIBE_REQUEST_MUTATION,
    {
      onCompleted: () => {
        toast.success('ScribeRequest created')
        navigate(routes.scribeRequests())
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
      userId: parseInt(input.userId),
      //modelInstanceId: parseInt(input.modelInstanceId),
      queryTokens: parseInt(input.queryTokens),
      responseTokens: parseInt(input.responseTokens),
    })
    createScribeRequest({ variables: { input: castInput } })
  }
  const fields = [
    {
      name: 'userId',
      prettyName: 'User id',

      required: 'This is required',
      // If this is a reference you probably want this below
      // uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FinduserIdHereFromScribeRequests(
          $filter: String
          $skip: Int
          $take: Int
        ) {
          search: users(filter: $filter, skip: $skip, take: $take) {
            count
            take
            skip
            results {
              id
              name
            }
          }
        }
      `,
    },
    {
      name: 'modelInstanceId',
      prettyName: 'Model instance id',
      required: 'This is required',
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindqueryTokensHereFromScribeRequests(
          $filter: String
          $skip: Int
          $take: Int
        ) {
          search: modelInstances(filter: $filter, skip: $skip, take: $take) {
            count
            take
            skip
            results {
              id
              name
            }
          }
        }
      `,
    },
    {
      name: 'queryTokens',
      prettyName: 'Query tokens',
    },
    {
      name: 'responseTokens',
      prettyName: 'Response tokens',

      // If this is a reference you probably want this below
      // uncomment and edit below to your needs
      // type: 'reference',
      // display: 'name',
      // value: 'id',
      // QUERY: gql`
      //   query FindresponseTokensHereFromScribeRequests(
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
    update: ['scribeRequestUpdate'],
    delete: ['scribeRequestDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title="New ScribeRequest"
        description="New ScribeRequest form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        returnLink={routes.scribeRequests()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

export default NewScribeRequest
