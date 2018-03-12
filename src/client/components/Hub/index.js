import { Link, withRouter } from 'react-router-dom'
import hubQuery from './hubQuery.graphql'
import { graphql } from 'react-apollo'
import React from 'react'
import './hub.scss'

class Hub extends React.Component {

  render() {

    console.log(this.props.hubQuery)

    return (
      <div className="hub-details">
        <div className="title">
          Hub: {
            !this.props.hubQuery.loading && 
            this.props.hubQuery.hub.attributes.name
          }
        </div>
        <div className="content">
          {
            this.props.hubQuery.loading && 
            <div>
              Loading hub ...
            </div>
          }  
        </div>
      </div>
    )
  }
}

export default graphql(hubQuery, {
  name: 'hubQuery',
  options: props => ({
    variables: {
      hubId: 'HUBID1' //props.match.params.id
    }
  })
})(withRouter(Hub))


