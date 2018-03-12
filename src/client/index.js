import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import {client as config} from 'c0nfig'
import ReactDOM from 'react-dom'
import merge from 'lodash/merge'
import React from 'react'
import 'babel-polyfill'
import {
  BrowserRouter as Router
} from 'react-router-dom'

//Redux Store
//import store from 'redux/store' 

// Apollo Resolvers
import appResolver from 'resolvers/app'

// App container
import App from 'containers/App'

const cache = new InMemoryCache()

const stateLink = withClientState({ 
  ...merge(appResolver), 
  cache 
})

const httpLink = new HttpLink({ 
  uri: `${config.apiUrl}/graphql`,
  credentials: 'include'
})

const link = ApolloLink.from([
  stateLink,
  httpLink
])

const client = new ApolloClient({
  cache,
  link
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App/>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)

