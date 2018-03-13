const typeDefs = [`

    type Query {
      itemVersions (projectId: String!, itemId: String!): ItemVersionsResponse
      folderContent (projectId: String!, folderId: String!): FolderContentResponse
      topFolders (hubId: String!, projectId: String!): FolderContentResponse
      project (hubId: String!, projectId: String!): ProjectResponse
      folder (projectId: String!, folderId: String!): FolderResponse
      projects (hubId: String!): ProjectsResponse
      hub (hubId: String!): HubResponse
      hubs: HubsResponse
    }

    type ItemVersionsResponse {
      data: [Version]
      error: Error
    }

    type FolderContentResponse {
      data: [FolderOrItem]
      error: Error
    }

    type ProjectsResponse {
      data: [Project]
      error: Error
    }

    type ProjectResponse {
      data: Project
      error: Error
    }

    type FolderResponse {
      data: Folder
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

    type Project {
      attributes: Attributes
      id: String
    }

    type Folder {
      attributes: Attributes
      id: String
    }

    type FolderOrItem {
      attributes: Attributes
      id: String
    }

    type Item {
      attributes: Attributes
      id: String
    }

    type Version {
      relationships: Relationships
      attributes: Attributes
      id: String
    }

    type Relationships {
      derivatives: Derivatives
    }

    type Derivatives {
      data: Data
    }

    type Data {
      id: String
    }

    type Attributes {
      extension: Extension
      displayName: String
      name: String
    }

    type Extension {
      version: String
      type: String
    }

    type Error {
      message: String
    }

    schema {
      query: Query
    }
`]

export default typeDefs