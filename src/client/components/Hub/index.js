import projectsQuery from './projectsQuery.graphql'
import { graphql, compose } from 'react-apollo'
import hubQuery from './hubQuery.graphql'
import { Link } from 'react-router-dom'
import React from 'react'
import './hub.scss'

class Hub extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderProject (project) {
    
    return (
      <div className="project" key={project.id}> 
        <Link to={`/project?projectId=${project.id}`}>
        { project.attributes.name }
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
      <div className="hub-details">
        <div className="title">
          Hub: {
            (this.props.hubQuery.hub)
              ? this.props.hubQuery.hub.data.attributes.name
              : 'loading ...'
          }
        </div>
        <div className="content">
          {
            this.props.projectsQuery.loading && 
            <div>
              Loading hub ...
            </div>
          }  
          {
            this.props.projectsQuery.projects && 
            this.props.projectsQuery.projects.data.map(project => (
              this.renderProject (project)
            ))
          }  
        </div>
      </div>
    )
  }
}

const witProjects = graphql(projectsQuery, {
  name: 'projectsQuery',
  options: props => {
    return {
      variables: {
        hubId: props.hubId
      }
    }
  }
})

const withHub = graphql(hubQuery, {
  name: 'hubQuery',
  options: props => {
    return {
      variables: {
        hubId: props.hubId
      }
    }
  }
})

export default compose(
  witProjects,
  withHub,
) (Hub)

