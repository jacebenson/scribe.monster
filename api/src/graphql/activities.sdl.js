export const schema = gql`
  type Activity {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    queryTokens: Int!
    responseTokens: Int!
    modelInstanceCuid: String!
    ModelInstance: ModelInstance!
    cost: Float!
    price: Float!
    userCuid: String!
    User: User!
    action: String!
  }

  type Activities {
    results: [Activity!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    activities(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Activities! @requireAuth(roles: ["activityRead", "admin"])

    activity(cuid: String!): Activity
      @requireAuth(roles: ["activityRead", "admin"])
  }

  input CreateActivityInput {
    cuid: String!
    queryTokens: Int!
    responseTokens: Int!
    modelInstanceCuid: String!
    cost: Float!
    price: Float!
    userCuid: String!
    action: String!
  }

  input UpdateActivityInput {
    cuid: String
    queryTokens: Int
    responseTokens: Int
    modelInstanceCuid: String
    cost: Float
    price: Float
    userCuid: String
    action: String
  }

  type Mutation {
    createActivity(input: CreateActivityInput!): Activity!
      @requireAuth(roles: ["activityCreate", "admin"])
    updateActivity(cuid: String!, input: UpdateActivityInput!): Activity!
      @requireAuth(roles: ["activityUpdate", "admin"])
    deleteActivity(cuid: String!): Activity!
      @requireAuth(roles: ["activityDelete", "admin"])
  }
`
