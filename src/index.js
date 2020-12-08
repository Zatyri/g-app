import React from 'react';
import ReactDOM from 'react-dom';
import { AzureAD } from 'react-aad-msal';

import App from './App';
import { authProvider } from './autentication/authProvider';

import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAccessToken } from './autentication/aquireToken';

const authLink = setContext(async (_, { scope, headers }) => {
  const accessToken = await getAccessToken(scope);

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: '/graphql' });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  credentials: 'include',
});

ReactDOM.render(
  <AzureAD provider={authProvider} forceLogin={true}>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </AzureAD>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
