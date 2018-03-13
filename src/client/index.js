import registerServiceWorker from './registerServiceWorker'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: ` + 
        `Message: ${message}`
        `Location: ${locations}` +
        `Path: ${path}`
      )
    )
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const stateLink = withClientState({ 
  ...merge(appResolver), 
  cache 
})

const httpLink = new HttpLink({ 
  // headers: {
  //   authorization: `Bearer ${ACCESS_TOKEN}`
  // },
  uri: `${config.apiUrl}/graphql`,
  credentials: 'include'
})

const link = ApolloLink.from([
  errorLink,
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

registerServiceWorker()
