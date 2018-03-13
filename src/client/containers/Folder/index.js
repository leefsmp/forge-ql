import { withRouter } from 'react-router-dom'
import * as qs from 'query-string'
import Folder from 'Folder'
import React from 'react'

const FolderView = (props) => {
  const query = qs.parse(props.location.search)
  return (
    <Hub projectId={query.projectId} folderId={query.folderId}/> 
  ) 
}

export default withRouter(FolderView)