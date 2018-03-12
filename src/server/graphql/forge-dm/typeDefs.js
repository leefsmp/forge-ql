const typeDefs = [`

    type Query {
      folderContent (projectId: String!, folderId: String!): FolderContentResponse
      topFolders (hubId: String!, projectId: String!): FolderContentResponse
      projects (hubId: String!): ProjectsResponse
      hub (hubId: String!): HubResponse
      hubs: HubsResponse
    }

    type FolderContentResponse {
      data: [FolderOrItem]
      error: Error
    }

    type ProjectsResponse {
      data: [Project]
      error: Error
    }

    type HubsResponse {
      error: Error
      data: [Hub]
    }

    type HubResponse {
      error: Error
      data: Hub
    }

    type Hub {
      attributes: Attributes
      id: String
    }

    type Attributes {
      extension: Extension
      name: String
    }

    type Extension {
      version: String
      type: String
    }

    type Project {
      attributes: Attributes
      id: String
    }

    type FolderOrItem {
      attributes: Attributes
      id: String
    }
    
    type Folder {
      attributes: Attributes
      id: String
    }

    type Item {
      attributes: Attributes
      id: String
    }

    type Error {
      message: String
    }

    schema {
      query: Query
    }
`]

export default typeDefs