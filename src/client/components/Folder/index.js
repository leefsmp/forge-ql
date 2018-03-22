import folderContentQuery from './folderContentQuery.graphql'
import folderQuery from './folderQuery.graphql'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import React from 'react'
import Item from 'Item'
import './folder.scss'

class Folder extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderFolder (projectId, folder) {

    return (
      <div className="folder" key={folder.id}> 
        <Link to={`/folder?projectId=${projectId}&folderId=${folder.id}`}>
          <span className="fa fa-folder-o"/>
          { folder.attributes.displayName }
        </Link>
      </div>  
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderItem (projectId, item) {

    return (
      <Item projectId={projectId} item={item} key={item.id}/>  
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderFolderOrItem (projectId, folderOrItem) {
    
    switch (folderOrItem.attributes.extension.type) {

      case 'folders:autodesk.core:Folder':
        return this.renderFolder(
          projectId, folderOrItem)

      case 'items:autodesk.core:File' :
        return this.renderItem(
          projectId, folderOrItem) 
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {
    
    return (
      <div className="folder-details">
        <div className="title">
          Folder: {
            (this.props.folderQuery.folder)
              ? this.props.folderQuery.folder.data.attributes.displayName
              : 'loading ...'
          }
        </div>
        <div className="content">
          {
            this.props.folderContentQuery.loading && 
            <div>
              Loading Folder Content ...
            </div>
          }  
          {
            this.props.folderContentQuery.folderContent && 
            this.props.folderContentQuery.folderContent.data.map(folderOrItem => (
              this.renderFolderOrItem (this.props.projectId, folderOrItem)
            ))
          }  
        </div>
      </div>
    )
  }
}

const withFolderContent = graphql(folderContentQuery, {
  name: 'folderContentQuery',
  options: props => {
    return {
      variables: {
        projectId: props.projectId,
        folderId: props.folderId
      }
    }
  }
})

const withFolder = graphql(folderQuery, {
  name: 'folderQuery',
  options: props => {
    return {
      variables: {
        projectId: props.projectId,
        folderId: props.folderId
      }
    }
  }
})

export default compose(
  withFolderContent,
  withFolder,
) (Folder)

