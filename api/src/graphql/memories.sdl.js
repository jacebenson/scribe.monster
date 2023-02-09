export const schema = gql`
  type Memory {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    content: String!
    source: String
    sourceUrl: String
    vector: String
    active: Boolean!
    title: String
  }

  type Memories {
    results: [Memory!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    memories(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Memories! @requireAuth(roles: ["memoryRead", "admin"])

    memory(cuid: String!): Memory @requireAuth(roles: ["memoryRead", "admin"])
  }

  input CreateMemoryInput {
    content: String!
    source: String
    sourceUrl: String
    vector: String
    active: Boolean!
    title: String!
  }

  input UpdateMemoryInput {
    cuid: String
    content: String
    source: String
    sourceUrl: String
    vector: String
    active: Boolean
    title: String
  }

  type Mutation {
    createMemory(input: CreateMemoryInput!): Memory!
      @requireAuth(roles: ["memoryCreate", "admin"])
    updateMemory(cuid: String!, input: UpdateMemoryInput!): Memory!
      @requireAuth(roles: ["memoryUpdate", "admin"])
    deleteMemory(cuid: String!): Memory!
      @requireAuth(roles: ["memoryDelete", "admin"])
  }
`
