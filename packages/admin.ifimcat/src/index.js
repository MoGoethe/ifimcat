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
import { createUploadLink } from "apollo-upload-client"
import ReduxApp from './ReduxApp'
import * as serviceWorker from './serviceWorker'

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors){
    console.log(graphQLErrors)
  }
  if (networkError) {
    window.location.href = '/500';
  }
})
const uploadLink = createUploadLink({
  uri: `http://localhost:8008/graphql`,
  credentials: 'include'
})
const link = ApolloLink.from([errorLink, uploadLink])
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ReduxApp />
  </ApolloProvider>, 
  document.getElementById('root')
)

serviceWorker.unregister();
