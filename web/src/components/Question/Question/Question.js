import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { DELETE_QUESTION_MUTATION } from 'src/components/Question/EditQuestionCell'

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

const Question = ({ question }) => {
  const [deleteQuestion] = useMutation(DELETE_QUESTION_MUTATION, {
    onCompleted: () => {
      toast.success('Question deleted')
      navigate(routes.questions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (cuid) => {
    if (confirm('Are you sure you want to delete question ' + cuid + '?')) {
      deleteQuestion({ variables: { cuid } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Question {question.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Cuid</th>
              <td>{question.cuid}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(question.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(question.updatedAt)}</td>
            </tr>
            <tr>
              <th>User cuid</th>
              <td>{question.userCuid}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{question.state}</td>
            </tr>
            <tr>
              <th>Text</th>
              <td>{question.text}</td>
            </tr>
            <tr>
              <th>Text vector</th>
              <td>{question.textVector}</td>
            </tr>
            <tr>
              <th>Rephrased text</th>
              <td>{question.rephrasedText}</td>
            </tr>
            <tr>
              <th>Rephrased text vector</th>
              <td>{question.rephrasedTextVector}</td>
            </tr>
            <tr>
              <th>Answer</th>
              <td>{question.answer}</td>
            </tr>
            <tr>
              <th>Answered at</th>
              <td>{timeTag(question.answeredAt)}</td>
            </tr>
            <tr>
              <th>Answered by</th>
              <td>{question.answeredBy}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(question.active)}</td>
            </tr>
            <tr>
              <th>Thread cuid</th>
              <td>{question.threadCuid}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editQuestion({ cuid: question.cuid })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(question.cuid)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Question
