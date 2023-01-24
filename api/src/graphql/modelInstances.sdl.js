export const schema = gql`
  type ModelInstance {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    version: Float!
    description: String!
    endpoint: String!
    required: String!
    cost: Float!
    price: Float!
    model: String!
    prompt: String!
    temperature: Float!
    maxTokens: Int!
    topP: Int!
    bestOf: Int!
    n: Int!
    stop: String!
    frequencyPenalty: Float!
    presencePenalty: Float!
  }

  type ModelInstances {
    results: [ModelInstance!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    modelInstances(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): ModelInstances! @requireAuth(roles: ["modelInstanceRead", "admin"])

    modelInstance(cuid: String!): ModelInstance
      @requireAuth(roles: ["modelInstanceRead", "admin"])
  }

  input CreateModelInstanceInput {
    name: String!
    version: Float!
    description: String!
    endpoint: String!
    required: String!
    cost: Float!
    price: Float!
    model: String!
    prompt: String!
    temperature: Float!
    maxTokens: Int!
    topP: Int!
    bestOf: Int!
    n: Int!
    stop: String!
    frequencyPenalty: Float!
    presencePenalty: Float!
  }

  input UpdateModelInstanceInput {
    name: String
    version: Float
    description: String
    endpoint: String
    required: String
    cost: Float
    price: Float
    model: String
    prompt: String
    temperature: Float
    maxTokens: Int
    topP: Int
    bestOf: Int
    n: Int
    stop: String
    frequencyPenalty: Float
    presencePenalty: Float
  }

  type Mutation {
    createModelInstance(input: CreateModelInstanceInput!): ModelInstance!
      @requireAuth(roles: ["modelInstanceCreate", "admin"])
    updateModelInstance(
      cuid: String!
      input: UpdateModelInstanceInput!
    ): ModelInstance! @requireAuth(roles: ["modelInstanceUpdate", "admin"])
    deleteModelInstance(cuid: String!): ModelInstance!
      @requireAuth(roles: ["modelInstanceDelete", "admin"])
  }
`
