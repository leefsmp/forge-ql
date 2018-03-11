const typeDefs = [`

    type Query {
      hubs: [Hub]
    }

    type Hub {
      id: String
    }

    schema {
      query: Query
    }
`]

export default typeDefs