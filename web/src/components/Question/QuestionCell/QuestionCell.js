import Question from 'src/components/Question/Question'

export const QUERY = gql`
  query FindQuestionById($cuid: String!) {
    question: question(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      userCuid
      state
      text
      rephrasedText
      rephrasedTextVector
      context
      answer
      answeredAt
      answeredBy
      active
      threadCuid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Question not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ question }) => {
  return <Question question={question} />
}
