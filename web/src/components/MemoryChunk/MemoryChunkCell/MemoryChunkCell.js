import MemoryChunk from 'src/components/MemoryChunk/MemoryChunk'

export const QUERY = gql`
  query FindMemoryChunkById($cuid: String!) {
    memoryChunk: memoryChunk(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      content
      vector
      active
      title
      memoryCuid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>MemoryChunk not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ memoryChunk }) => {
  return <MemoryChunk memoryChunk={memoryChunk} />
}
