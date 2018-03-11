import { withRouter } from 'react-router-dom'
import feedQuery from './feedQuery.graphql'
import { graphql } from 'react-apollo'
import React from 'react'
import './feed.scss'

class Feed extends React.Component {

  componentWillReceiveProps(nextProps) {
    const {location} = this.props
    if (location.key !== nextProps.location.key) {
      this.props.feedQuery.refetch()
    }
  }

  render() {

    return (
      <div className="feed">
        <h2>
          Posts Feed
        </h2>
        <div className="posts-list">
        {
          this.props.feedQuery.loading && 
          <div>
            Loading posts ...
          </div>
        }  
        {
          this.props.feedQuery.posts &&
          this.props.feedQuery.posts.map(post => (
            <div className="post" key={post._id}> 
              { post.title }
            </div>  
          ))
        }
        </div> 
      </div>
    )
  }
}

// <Post
//  key={post.id}
// post={post}
//  refresh={() => this.props.feedQuery.refetch()}
//  isDraft={!post.isPublished}
///>


export default graphql(feedQuery, {
  // name of the injected prop: this.props.feedQuery...
  name: 'feedQuery', 
  options: {
    fetchPolicy: 'network-only',
  },
})(withRouter(Feed))
