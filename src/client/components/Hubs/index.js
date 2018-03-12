import { Link } from 'react-router-dom'
import hubsQuery from './hubsQuery.graphql'
import { graphql } from 'react-apollo'
import React from 'react'
import './hubs.scss'

class Hubs extends React.Component {

  displayHubName (hubAttributes) {

    switch (hubAttributes.extension.type) {

      case 'hubs:autodesk.a360:PersonalHub':
        return 'Personal Hub: ' + hubAttributes.name

      case 'hubs:autodesk.core:Hub':
        return 'Team Hub: ' + hubAttributes.name

      case 'hubs:autodesk.bim360:Account':
        return 'BIM Hub: ' + hubAttributes.name

      default:
        return 'Hub: ' + hubAttributes.name
    }
  }

  renderHub (hub) {
    
    return (
      <div className="hub" key={hub.id}> 
        <Link to={`/hub?id=${hub.id}`}>
        { this.displayHubName(hub.attributes) }
        </Link>
      </div>  
    )
  }

  render() {

    return (
      <div className="hubs">
        <div className="title">
          Hubs
        </div>
        <div className="hubs-list">
        {
          this.props.hubsQuery.loading && 
          <div>
            Loading hubs ...
          </div>
        }  
        {
          this.props.hubsQuery.hubs &&
          this.props.hubsQuery.hubs.map(hub => (
            this.renderHub (hub)
          ))
        }
        </div> 
      </div>
    )
  }
}

export default graphql(hubsQuery, {
  name: 'hubsQuery', 
  options: {
    fetchPolicy: 'network-only',
  },
})(Hubs)
