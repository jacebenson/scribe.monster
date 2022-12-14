import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { DELETE_PROMPT_TRAINING_DATA_MUTATION } from 'src/components/PromptTrainingData/EditPromptTrainingDataCell'

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

const PromptTrainingData = ({ promptTrainingData }) => {
  const [deletePromptTrainingData] = useMutation(
    DELETE_PROMPT_TRAINING_DATA_MUTATION,
    {
      onCompleted: () => {
        toast.success('PromptTrainingData deleted')
        navigate(routes.promptTrainingDatas())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete promptTrainingData ' + id + '?')
    ) {
      deletePromptTrainingData({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PromptTrainingData {promptTrainingData.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{promptTrainingData.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(promptTrainingData.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(promptTrainingData.updatedAt)}</td>
            </tr>
            <tr>
              <th>Prompt</th>
              <td>{promptTrainingData.prompt}</td>
            </tr>
            <tr>
              <th>Table</th>
              <td>{promptTrainingData.table}</td>
            </tr>
            <tr>
              <th>Action</th>
              <td>{promptTrainingData.action}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{promptTrainingData.type}</td>
            </tr>
            <tr>
              <th>Completion</th>
              <td>{promptTrainingData.completion}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{promptTrainingData.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPromptTrainingData({ id: promptTrainingData.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(promptTrainingData.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PromptTrainingData
