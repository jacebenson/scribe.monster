import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { DELETE_MODEL_INSTANCE_MUTATION } from 'src/components/ModelInstance/EditModelInstanceCell'

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

const ModelInstance = ({ modelInstance }) => {
  const [deleteModelInstance] = useMutation(DELETE_MODEL_INSTANCE_MUTATION, {
    onCompleted: () => {
      toast.success('ModelInstance deleted')
      navigate(routes.modelInstances())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete modelInstance ' + id + '?')) {
      deleteModelInstance({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ModelInstance {modelInstance.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{modelInstance.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(modelInstance.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(modelInstance.updatedAt)}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{modelInstance.name}</td>
            </tr>
            <tr>
              <th>Version</th>
              <td>{modelInstance.version}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{modelInstance.description}</td>
            </tr>
            <tr>
              <th>Endpoint</th>
              <td>{modelInstance.endpoint}</td>
            </tr>
            <tr>
              <th>Cost</th>
              <td>{modelInstance.cost}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{modelInstance.price}</td>
            </tr>
            <tr>
              <th>Model</th>
              <td>{modelInstance.model}</td>
            </tr>
            <tr>
              <th>Prompt</th>
              <td>{modelInstance.prompt}</td>
            </tr>
            <tr>
              <th>Temperature</th>
              <td>{modelInstance.temperature}</td>
            </tr>
            <tr>
              <th>Max tokens</th>
              <td>{modelInstance.maxTokens}</td>
            </tr>
            <tr>
              <th>Top p</th>
              <td>{modelInstance.topP}</td>
            </tr>
            <tr>
              <th>Best of</th>
              <td>{modelInstance.bestOf}</td>
            </tr>
            <tr>
              <th>N</th>
              <td>{modelInstance.n}</td>
            </tr>
            <tr>
              <th>Stop</th>
              <td>{modelInstance.stop}</td>
            </tr>
            <tr>
              <th>Frequency penalty</th>
              <td>{modelInstance.frequencyPenalty}</td>
            </tr>
            <tr>
              <th>Presence penalty</th>
              <td>{modelInstance.presencePenalty}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editModelInstance({ id: modelInstance.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(modelInstance.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ModelInstance
