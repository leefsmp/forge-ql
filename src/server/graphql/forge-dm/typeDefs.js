const typeDefs = [`

    type Query {
      folderContent (projectId: String!, folderId: String!): [FolderObject]
      topFolders (hubId: String!, projectId: String!): [Folder]
      project (hubId: String!, projectId: String!): Project
      projects (hubId: String!): [Project]
      hub (hubId: String!): HubResponse
      hubs: HubsResponse
    }

    type HubsResponse {
      error: String
      data: [Hub]
    }

    type HubResponse {
      error: String
      data: Hub
    }

    type Hub {
      attributes: HubAttributes
      id: String
    }

    type HubAttributes {
      extension: Extension
      name: String
    }

    type Extension {
      version: String
      type: String
    }

    type Project {
      id: String
    }

    type Folder {
      id: String
    }

    type FolderObject {
      id: String
    }

    schema {
      query: Query
    }
`]

export default typeDefs