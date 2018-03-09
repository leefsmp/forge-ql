import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import ReactDOM from 'react-dom'
import merge from 'lodash/merge'
import React from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'


//Redux Store
//import store from 'redux/store' 

// Apollo Resolvers
import appResolver from 'resolvers/app'

// App container
import App from 'containers/App'

const apolloCache = new InMemoryCache()

const stateLink = withClientState({ 
  ...merge(appResolver), 
  cache: apolloCache 
})

const httpLink = new HttpLink({ 
  uri: `${process.env.API_URL}/graphql`
})

const apolloLink = ApolloLink.from([
  stateLink,
  httpLink
])

const client = new ApolloClient({
  cache: apolloCache,
  link: apolloLink,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App/>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
