export const schema = gql`
  type ScribeRequest {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: Int!
    modelInstance: ModelInstance!
    modelInstanceId: String!
    queryTokens: Int
    responseTokens: Int
    totalTokens: String #calculated on servcie file
  }

  type ScribeRequests {
    results: [ScribeRequest!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    scribeRequests(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): ScribeRequests! @requireAuth(roles: ["scribeRequestRead", "admin"])

    scribeRequest(id: String!): ScribeRequest
      @requireAuth(roles: ["scribeRequestRead", "admin"])
  }

  input CreateScribeRequestInput {
    userId: Int!
    modelInstanceId: String!
    queryTokens: Int
    responseTokens: Int
  }

  input UpdateScribeRequestInput {
    userId: Int
    modelInstanceId: String
    queryTokens: Int
    responseTokens: Int
  }

  type Mutation {
    createScribeRequest(input: CreateScribeRequestInput!): ScribeRequest!
      @requireAuth(roles: ["scribeRequestCreate", "admin"])
    updateScribeRequest(
      id: String!
      input: UpdateScribeRequestInput!
    ): ScribeRequest! @requireAuth(roles: ["scribeRequestUpdate", "admin"])
    deleteScribeRequest(id: String!): ScribeRequest!
      @requireAuth(roles: ["scribeRequestDelete", "admin"])
  }
`
