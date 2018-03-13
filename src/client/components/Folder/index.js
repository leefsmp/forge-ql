import folderContentQuery from './folderContentQuery.graphql'
import folderQuery from './folderQuery.graphql'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import React from 'react'
import './folder.scss'

class Folder extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderFolder (folderId, folder) {

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
  renderItem (folderId, item) {

    return (
      <div className="item" key={item.id}> 
        <Link to={`/folder?projectId=${projectId}&folderId=${folder.id}`}>
          { item.attributes.name }
        </Link>
      </div>  
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderFolderOrItem (folderId, folderOrItem) {
    
    switch (folderOrItem.attributes.extension.type) {

      case '':
        return this.renderFolder(folderId, folderOrItem)

      case '' :
        return this.renderItem(folderId, folderOrItem) 
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
              ? this.props.folderQuery.folder.data.attributes.name
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
              this.renderFolderOrItem (this.props.folderId, folderOrItem)
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

