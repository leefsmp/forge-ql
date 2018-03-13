import { graphql, compose } from 'react-apollo'
import { Route } from 'react-router-dom'
import AppNavbar from 'AppNavbar'
import 'font-awesome-webpack'
import gql from 'graphql-tag'
import 'bootstrap-webpack'
import React from 'react'
import './app.scss'

// routes
import Project from 'containers/Project'
import Folder from 'containers/Folder'
import Viewer from 'containers/Viewer'
import Home from 'containers/Home'
import Blog from 'containers/Blog'
import Hubs from 'containers/Hubs'
import Hub from 'containers/Hub'


class App extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super(props)

    this.onLogin = this.onLogin.bind(this)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount() {

    this.props.fetchUser()
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onLogin () {

    this.props.doLogin()
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    return ( 
      <div className="app">
       <AppNavbar user={this.props.user} onLogin={this.onLogin}/>
        <main>
          <Route exact path="/project" component={Project}/>
          <Route exact path="/folder" component={Folder}/>
          <Route exact path="/viewer" component={Viewer}/>
          <Route exact path="/blog" component={Blog}/>
          <Route exact path="/hubs" component={Hubs}/>
          <Route exact path="/hub" component={Hub}/>
          <Route exact path="/" component={Home}/>
        </main>
      </div>
    )
  }
}

const fetchUser = graphql(gql`
  mutation FetchUser {
    fetchUser @client
  }`, {
  props: ({ mutate }) => ({
    fetchUser: () => mutate({})
  })
})

const doLogin = graphql(gql`
  mutation DoLogin {
    doLogin @client
  }`, {
  props: ({ mutate }) => ({
    doLogin: () => mutate({})
  })
})

const withUser = graphql(gql`
  query GetUser {
    user @client {
      profileImage
      firstName
      lastName
    }
  }`, {
  props: ({ ownProps, data }) => { 

    if (data.loading || data.error) return { 
      ...ownProps,
      user: null 
    }

    return {
      ...ownProps,
      user: data.user
    }
  }
})

export default compose(
  fetchUser,
  withUser,
  doLogin
) (App)