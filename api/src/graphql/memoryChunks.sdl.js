export const schema = gql`
  type MemoryChunk {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    content: String!
    vector: String
    active: Boolean!
    title: String!
    memoryCuid: String!
    memory: Memory!
  }

  type MemoryChunks {
    results: [MemoryChunk!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    memoryChunks(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): MemoryChunks! @requireAuth(roles: ["memoryChunkRead", "admin"])

    memoryChunk(cuid: String!): MemoryChunk
      @requireAuth(roles: ["memoryChunkRead", "admin"])
  }

  input CreateMemoryChunkInput {
    content: String!
    vector: String
    active: Boolean!
    title: String!
    memoryCuid: String!
  }

  input UpdateMemoryChunkInput {
    cuid: String
    content: String
    vector: String
    active: Boolean
    title: String
    memoryCuid: String
  }

  type Mutation {
    createMemoryChunk(input: CreateMemoryChunkInput!): MemoryChunk!
      @requireAuth(roles: ["memoryChunkCreate", "admin"])
    updateMemoryChunk(
      cuid: String!
      input: UpdateMemoryChunkInput!
    ): MemoryChunk! @requireAuth(roles: ["memoryChunkUpdate", "admin"])
    deleteMemoryChunk(cuid: String!): MemoryChunk!
      @requireAuth(roles: ["memoryChunkDelete", "admin"])
  }
`
