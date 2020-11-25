import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { BrowserRouter as Router } from 'react-router-dom';
import { getCookie } from './components/utils/cookies';

const authLink = setContext((_, { headers }) => {
  let token = '';
  if (process.env.NODE_ENV === 'development') {
    token = localStorage.getItem('g-app-user-token');
  }
  if (process.env.NODE_ENV === 'production') {
    token = getCookie('g-app-user-token');
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
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
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
