import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

export const QUERY = gql`
  query EditScribeRequestById($cuid: String!) {
    scribeRequest: scribeRequest(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      userCuid
      user {
        cuid
        name
      }
      modelInstance {
        cuid
        name
      }
      modelInstanceCuid
      queryTokens
      responseTokens
    }
  }
`
const UPDATE_SCRIBE_REQUEST_MUTATION = gql`
  mutation UpdateScribeRequestMutation(
    $cuid: String!
    $input: UpdateScribeRequestInput!
  ) {
    updateScribeRequest(cuid: $cuid, input: $input) {
      cuid
      createdAt
      updatedAt
      userCuid
      #modelInstanceId
      queryTokens
      responseTokens
    }
  }
`
export const DELETE_SCRIBE_REQUEST_MUTATION = gql`
  mutation DeleteScribeRequestMutation($cuid: String!) {
    deletedRow: deleteScribeRequest(cuid: $cuid) {
      cuid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ scribeRequest }) => {
  const [updateScribeRequest, { loading, error }] = useMutation(
    UPDATE_SCRIBE_REQUEST_MUTATION,
    {
      onCompleted: () => {
        toast.success('ScribeRequest updated')
        navigate(routes.scribeRequests())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, scribeRequest.cuid)
  }
  const onSave = (input, cuid) => {
    const castInput = Object.assign(input, {
      userCuid: parseInt(input.userCuid),
      queryTokens: parseInt(input.queryTokens),
      responseTokens: parseInt(input.responseTokens),
    })
    updateScribeRequest({ variables: { cuid, input: castInput } })
  }

  const [deleteScribeRequest] = useMutation(DELETE_SCRIBE_REQUEST_MUTATION, {
    onCompleted: () => {
      toast.success('ScribeRequest deleted')
      navigate(routes.scribeRequests())
    },
  })

  const onDelete = (cuid) => {
    if (
      confirm('Are you sure you want to delete ScribeRequest ' + cuid + '?')
    ) {
      deleteScribeRequest({ variables: { cuid } })
    }
  }
  const fields = [
    {
      name: 'userCuid',
      prettyName: 'User id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // update the query above "EditScribeRequestById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'cuid',
      defaultValue: scribeRequest.user.cuid,
      defaultDisplay: scribeRequest.user.name,
      QUERY: gql`
        query FindUserFromScribeRequests(
          $filter: String
          $skip: Int
          $take: Int
        ) {
          search: users(filter: $filter, skip: $skip, take: $take) {
            count
            take
            skip
            results {
              cuid
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
      //type: 'string',
      // If this is a reference you probably want this below
      // update the query above "EditScribeRequestById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'cuid',
      defaultValue: scribeRequest.modelInstance.cuid,
      defaultDisplay: scribeRequest.modelInstance.name,
      QUERY: gql`
        query Find_referencedModelHere_FromScribeRequests(
          $filter: String
          $skip: Int
          $take: Int
        ) {
          search: modelInstances(filter: $filter, skip: $skip, take: $take) {
            count
            take
            skip
            results {
              cuid
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
      // update the query above "EditScribeRequestById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      // type: 'reference',
      // display: 'name',
      // value: 'cuid',
      // defaultValue: scriberequest._referencedModelHere_.id,
      // defaultDisplay: scriberequest._referencedModelHere_._displayColumn_,
      // QUERY: gql`
      //   query Find_referencedModelHere_FromScribeRequests(
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
        title={`scribeRequest.cuid`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={scribeRequest}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
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
