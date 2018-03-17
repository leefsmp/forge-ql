import { withRouter } from 'react-router-dom'
import feedQuery from './feedQuery.graphql'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import React from 'react'
import './feed.scss'

class Feed extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillReceiveProps(nextProps) {
    const {location} = this.props
    if (location.key !== nextProps.location.key) {
      this.props.feedQuery.refetch()
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderPost (post) {
    
    return (
      <div className="post" key={post._id}> 
        <Link to={`/post?postId=${post._id}`}>
          <span className="fa fa-folder-o"/>
          { post.title }
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
      <div className="feed">
        <div className="title">
          Posts Feed
        </div>
        <div className="content">
        {
          this.props.feedQuery.loading && 
          <div>
            Loading posts ...
          </div>
        }  
        {
          this.props.feedQuery.posts &&
          this.props.feedQuery.posts.map(post => (
            this.renderPost (post)
          ))
        }
        </div> 
      </div>
    )
  }
}

export default graphql(feedQuery, {
  // name of the injected prop: this.props.feedQuery...
  name: 'feedQuery', 
  options: {
    fetchPolicy: 'network-only',
  },
})(withRouter(Feed))
