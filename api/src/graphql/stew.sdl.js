export const schema = gql`
  type StewResponse {
    context: String!
    answer: String!
    cost: JSON!
    tokenUsage: JSON!
  }

  type Mutation {
    stewQuestion(input: CreateQuestionInput!): StewResponse @requireAuth
  }
`
