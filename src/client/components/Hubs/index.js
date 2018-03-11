import { withRouter } from 'react-router-dom'
import hubsQuery from './hubsQuery.graphql'
import { graphql } from 'react-apollo'
import React from 'react'
import './hubs.scss'

class Hubs extends React.Component {

  render() {

    return (
      <div className="hubs">
        <h2>
          Hubs
        </h2>
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
            <div className="post" key={hub.id}> 
              { hub.id }
            </div>  
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
})(withRouter(Hubs))
