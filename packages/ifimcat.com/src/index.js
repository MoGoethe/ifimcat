import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { onError } from "apollo-link-error"
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import App from './App'
import * as serviceWorker from './serviceWorker'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    window.location.href = '/500';
  }
  if (networkError) {
    window.location.href = '/500';
  }
});

const httpLink = createHttpLink({
  uri: "/api/graphql",
  credentials: 'include',
});
const link = ApolloLink.from([errorLink, httpLink]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister();
