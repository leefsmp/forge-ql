import { Link } from 'react-router-dom'
import React from 'react'

export default class Post extends React.Component {

  render() {

    return (
      <Link className="no-underline ma1" to={`/post/${this.props.post.id}`}>
        <h2 className="f3 black-80 fw4 lh-solid">{title}</h2>
        <p className="black-80 fw3">{this.props.post.text}</p>
      </Link>
    )
  }
}
