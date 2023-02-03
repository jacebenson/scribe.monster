export const schema = gql`
  type Thread {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userCuid: String
    user: User
    question: [Question]!
  }

  type Threads {
    results: [Thread!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    threads(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Threads! @requireAuth(roles: ["threadRead", "admin"])

    thread(cuid: String!): Thread @requireAuth(roles: ["threadRead", "admin"])
  }

  input CreateThreadInput {
    cuid: String!
    userCuid: String
  }

  input UpdateThreadInput {
    cuid: String
    userCuid: String
  }

  type Mutation {
    createThread(input: CreateThreadInput!): Thread!
      @requireAuth(roles: ["threadCreate", "admin"])
    updateThread(cuid: String!, input: UpdateThreadInput!): Thread!
      @requireAuth(roles: ["threadUpdate", "admin"])
    deleteThread(cuid: String!): Thread!
      @requireAuth(roles: ["threadDelete", "admin"])
  }
`
