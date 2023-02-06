import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { DELETE_MEMORY_CHUNK_MUTATION } from 'src/components/MemoryChunk/EditMemoryChunkCell'

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const MemoryChunk = ({ memoryChunk }) => {
  const [deleteMemoryChunk] = useMutation(DELETE_MEMORY_CHUNK_MUTATION, {
    onCompleted: () => {
      toast.success('MemoryChunk deleted')
      navigate(routes.memoryChunks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (cuid) => {
    if (confirm('Are you sure you want to delete memoryChunk ' + cuid + '?')) {
      deleteMemoryChunk({ variables: { cuid } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            MemoryChunk {memoryChunk.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Cuid</th>
              <td>{memoryChunk.cuid}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(memoryChunk.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(memoryChunk.updatedAt)}</td>
            </tr>
            <tr>
              <th>Content</th>
              <td>{memoryChunk.content}</td>
            </tr>
            <tr>
              <th>Vector</th>
              <td>{memoryChunk.vector}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(memoryChunk.active)}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{memoryChunk.title}</td>
            </tr>
            <tr>
              <th>Memory cuid</th>
              <td>{memoryChunk.memoryCuid}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMemoryChunk({ cuid: memoryChunk.cuid })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(memoryChunk.cuid)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default MemoryChunk
