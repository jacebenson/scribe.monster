export const schema = gql`
  type Question {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userCuid: String
    user: User
    state: String!
    text: String!
    rephrasedText: String
    rephrasedTextVector: String
    context: String
    answer: String
    answeredAt: DateTime
    answeredBy: String
    active: Boolean!
    thread: Thread!
    threadCuid: String!
  }

  type Questions {
    results: [Question!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    questions(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Questions! @requireAuth(roles: ["questionRead", "admin"])

    question(cuid: String!): Question
      @requireAuth(roles: ["questionRead", "admin"])
  }

  input CreateQuestionInput {
    ##cuid: String!
    userCuid: String
    ##state: String!
    text: String!
    rephrasedText: String
    rephrasedTextVector: String
    context: String
    answer: String
    answeredAt: DateTime
    answeredBy: String
    ##active: Boolean!
    threadCuid: String
  }

  input UpdateQuestionInput {
    cuid: String
    userCuid: String
    state: String
    text: String
    rephrasedText: String
    rephrasedTextVector: String
    context: String
    answer: String
    answeredAt: DateTime
    answeredBy: String
    active: Boolean
    threadCuid: String
  }

  type Mutation {
    createQuestion(input: CreateQuestionInput!): Question!
      @requireAuth(roles: ["questionCreate", "admin"])
    updateQuestion(cuid: String!, input: UpdateQuestionInput!): Question!
      @requireAuth(roles: ["questionUpdate", "admin"])
    deleteQuestion(cuid: String!): Question!
      @requireAuth(roles: ["questionDelete", "admin"])
  }
`
