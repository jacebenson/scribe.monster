import Memory from 'src/components/Memory/Memory'

export const QUERY = gql`
  query FindMemoryById($cuid: String!) {
    memory: memory(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      content
      vector
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Memory not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ memory }) => {
  return <Memory memory={memory} />
}
