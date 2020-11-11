import { gql } from '@apollo/client';

export const ALL_USERS = gql`
  query {
    allUsers {
      id
      name
      username
      store
      type
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $username: String!, $type: String!, $store: Int!, $password: String!){
    addUser(name: $name, username: $username, type: $type, store: $store, password: $password){
      id
      name
      type
      store
      username
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $name: String!, $type: String!, $store: Int!){
    updateUser(id: $id, name: $name, type: $type, store: $store){
      id
      name
      type
      store
      username
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;
