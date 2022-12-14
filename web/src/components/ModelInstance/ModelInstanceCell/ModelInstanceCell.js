import ModelInstance from 'src/components/ModelInstance/ModelInstance'

export const QUERY = gql`
  query FindModelInstanceById($id: String!) {
    modelInstance: modelInstance(id: $id) {
      id
      createdAt
      updatedAt
      name
      version
      description
      endpoint
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ModelInstance not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ modelInstance }) => {
  return <ModelInstance modelInstance={modelInstance} />
}
