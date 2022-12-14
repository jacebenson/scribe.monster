export const schema = gql`
  type PromptTrainingData {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    prompt: String!
    table: String!
    action: String!
    type: String!
    completion: String!
    submittedBy: User!
    userId: Int!
  }

  type PromptTrainingDatas {
    results: [PromptTrainingData!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    promptTrainingDatas(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): PromptTrainingDatas!
      @requireAuth(roles: ["promptTrainingDataRead", "admin"])

    promptTrainingData(id: String!): PromptTrainingData
      @requireAuth(roles: ["promptTrainingDataRead", "admin"])
  }

  input CreatePromptTrainingDataInput {
    prompt: String!
    table: String!
    action: String!
    type: String!
    completion: String!
    userId: Int!
  }

  input UpdatePromptTrainingDataInput {
    prompt: String
    table: String
    action: String
    type: String
    completion: String
    userId: Int
  }

  type Mutation {
    createPromptTrainingData(
      input: CreatePromptTrainingDataInput!
    ): PromptTrainingData!
      @requireAuth(roles: ["promptTrainingDataCreate", "admin"])
    updatePromptTrainingData(
      id: String!
      input: UpdatePromptTrainingDataInput!
    ): PromptTrainingData!
      @requireAuth(roles: ["promptTrainingDataUpdate", "admin"])
    deletePromptTrainingData(id: String!): PromptTrainingData!
      @requireAuth(roles: ["promptTrainingDataDelete", "admin"])
  }
`
