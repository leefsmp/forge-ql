import topFoldersQuery from './topFoldersQuery.graphql'
import projectQuery from './projectQuery.graphql'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import React from 'react'
import './project.scss'

class Project extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderFolder (projectId, folder) {
    
    return (
      <div className="folder" key={folder.id}> 
        <Link to={`/folder?projectId=${projectId}&folderId=${folder.id}`}>
          { folder.attributes.name }
        </Link>
      </div>  
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {
    
    return (
      <div className="project-details">
        <div className="title">
          Project: {
            (this.props.projectQuery.project)
              ? this.props.projectQuery.project.data.attributes.name
              : 'loading ...'
          }
        </div>
        <div className="content">
          {
            this.props.topFoldersQuery.loading && 
            <div>
              Loading Folders ...
            </div>
          }  
          {
            this.props.topFoldersQuery.topFolders && 
            this.props.topFoldersQuery.topFolders.data.map(folder => (
              this.renderFolder (this.props.projectId, folder)
            ))
          }  
        </div>
      </div>
    )
  }
}

const withTopFolders = graphql(topFoldersQuery, {
  name: 'topFoldersQuery',
  options: props => {
    return {
      variables: {
        projectId: props.projectId,
        hubId: props.hubId
      }
    }
  }
})

const withProject = graphql(projectQuery, {
  name: 'projectQuery',
  options: props => {
    return {
      variables: {
        projectId: props.projectId,
        hubId: props.hubId
      }
    }
  }
})

export default compose(
  withTopFolders,
  withProject,
) (Project)

