import { withRouter } from 'react-router-dom'
import * as qs from 'query-string'
import Project from 'Project'
import React from 'react'

const ProjectView = (props) => {
  const query = qs.parse(props.location.search)
  return (
    <Project hubId={query.hubId} projectId={query.projectId}/> 
  ) 
}

export default withRouter(ProjectView)