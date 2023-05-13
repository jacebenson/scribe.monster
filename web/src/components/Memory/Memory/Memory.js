import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { DELETE_MEMORY_MUTATION } from 'src/components/Memory/EditMemoryCell'

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

const Memory = ({ memory }) => {
  const [deleteMemory] = useMutation(DELETE_MEMORY_MUTATION, {
    onCompleted: () => {
      toast.success('Memory deleted')
      navigate(routes.memories())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (cuid) => {
    if (confirm('Are you sure you want to delete memory ' + cuid + '?')) {
      deleteMemory({ variables: { cuid } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Memory {memory.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Cuid</th>
              <td>{memory.cuid}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(memory.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(memory.updatedAt)}</td>
            </tr>
            <tr>
              <th>Content</th>
              <td>{memory.content}</td>
            </tr>
            <tr>
              <th>Vector</th>
              <td>{memory.vector}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(memory.active)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMemory({ cuid: memory.cuid })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(memory.cuid)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Memory
