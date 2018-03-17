import { withRouter } from 'react-router-dom'
import * as qs from 'query-string'
import React from 'react'
import Hub from 'Hub'

const HubView = (props) => {
  const query = qs.parse(props.location.search)
  return (
    <Hub hubId={query.hubId}/> 
  ) 
}

export default withRouter(HubView)

 