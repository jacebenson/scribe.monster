import PromptTrainingData from 'src/components/PromptTrainingData/PromptTrainingData'

export const QUERY = gql`
  query FindPromptTrainingDataById($id: String!) {
    promptTrainingData: promptTrainingData(id: $id) {
      id
      createdAt
      updatedAt
      prompt
      table
      action
      type
      completion
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PromptTrainingData not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ promptTrainingData }) => {
  return <PromptTrainingData promptTrainingData={promptTrainingData} />
}
