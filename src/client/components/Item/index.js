import itemVersionsQuery from './itemVersionsQuery.graphql'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import {client as config} from 'c0nfig'
import Image from 'Image'
import React from 'react'
import './item.scss'

class Item extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  getVersionURN (version, useStorage = false) {

    if (!useStorage) {

      if (version.relationships.derivatives) {
        return version.relationships.derivatives.data.id
      }
    }

    if (version.relationships.storage) {

      const urn = window.btoa(
        version.relationships.storage.data.id)

      return urn.replace(new RegExp('=', 'g'), '')
    }

    return null
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {
    
    const item = this.props.item

    const versions = this.props.itemVersionsQuery.itemVersions
      ? this.props.itemVersionsQuery.itemVersions.data
      : null

    const urn = versions
      ? this.getVersionURN(versions[0])
      : null

    const src = urn 
      ? `${config.apiUrl}/derivatives3Legged/thumbnail/${urn}`
      : null

    return (
      <div className="item"> 
        <Link to={`/viewer?urn=${urn}`}>
          <Image src={src}/>
          { item.attributes.displayName }
        </Link>
      </div>  
    )
  }
}

const withItemVersions = graphql(itemVersionsQuery, {
  name: 'itemVersionsQuery',
  options: ({projectId, item}) => {
    return {
      variables: {
        itemId: item.id,
        projectId
      }
    }
  }
})

export default compose(
  withItemVersions
) (Item)

