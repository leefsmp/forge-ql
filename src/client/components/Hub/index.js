import hubQuery from './hubQuery.graphql'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import React from 'react'
import './hub.scss'

class Hub extends React.Component {

  render() {

    return (
      <div className="hub-details">
        <div className="title">
          Hub: {
            this.props.hubQuery.hub && 
            this.props.hubQuery.hub.data.attributes.name
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
  options: props => {
    return {
      variables: {
        hubId: props.hubId
      }
    }
  }
})(Hub)


