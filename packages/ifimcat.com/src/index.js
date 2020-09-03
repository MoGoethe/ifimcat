import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { onError } from "apollo-link-error"
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import App from './App'
import * as serviceWorker from './serviceWorker'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors)
  }
  if (networkError) {
    console.log(networkError)
    // window.location.href = '/500';
  }
});

const link = ApolloLink.from([errorLink]);
const client = new ApolloClient({
  link,
  uri: "/api/graphql",
  credentials: 'include',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister();
