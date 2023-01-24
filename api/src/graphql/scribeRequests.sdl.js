export const schema = gql`
  type ScribeRequest {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userCuid: String!
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

    scribeRequest(cuid: String!): ScribeRequest
      @requireAuth(roles: ["scribeRequestRead", "admin"])
  }

  input CreateScribeRequestInput {
    userCuid: String!
    modelInstanceCuid: String!
    queryTokens: Int
    responseTokens: Int
  }

  input UpdateScribeRequestInput {
    userCuid: String
    modelInstanceId: String
    queryTokens: Int
    responseTokens: Int
  }

  type Mutation {
    createScribeRequest(input: CreateScribeRequestInput!): ScribeRequest!
      @requireAuth(roles: ["scribeRequestCreate", "admin"])
    updateScribeRequest(
      cuid: String!
      input: UpdateScribeRequestInput!
    ): ScribeRequest! @requireAuth(roles: ["scribeRequestUpdate", "admin"])
    deleteScribeRequest(cuid: String!): ScribeRequest!
      @requireAuth(roles: ["scribeRequestDelete", "admin"])
  }
`
