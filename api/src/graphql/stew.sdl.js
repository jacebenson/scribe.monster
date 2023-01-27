export const schema = gql`
  type StewResponse {
    context: String!
    answer: String!
    cost: JSON!
    tokenUsage: JSON!
  }
  input CreateQuestionInput {
    question: String!
  }
  type Mutation {
    stewQuestion(input: CreateQuestionInput!): StewResponse @skipAuth
  }
`
