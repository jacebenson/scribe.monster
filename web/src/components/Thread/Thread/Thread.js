import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { DELETE_THREAD_MUTATION } from 'src/components/Thread/EditThreadCell'

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

const Thread = ({ thread }) => {
  const [deleteThread] = useMutation(DELETE_THREAD_MUTATION, {
    onCompleted: () => {
      toast.success('Thread deleted')
      navigate(routes.threads())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (cuid) => {
    if (confirm('Are you sure you want to delete thread ' + cuid + '?')) {
      deleteThread({ variables: { cuid } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Thread {thread.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Cuid</th>
              <td>{thread.cuid}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(thread.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(thread.updatedAt)}</td>
            </tr>
            <tr>
              <th>User cuid</th>
              <td>{thread.userCuid}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editThread({ cuid: thread.cuid })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(thread.cuid)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Thread
