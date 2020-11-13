import { gql } from '@apollo/client';
import { SUBSCRIPTION_INFO } from './fragments';

export const ALL_SUBSCRIPTIONS = gql`
  query {
    allSubscriptions {
      ...SubscriptionInfo
    }
  }
  ${SUBSCRIPTION_INFO}
`;

export const ADD_SUBSCRIPTION = gql`
  mutation addSubscription($id: ID!, $operator: String!, $name: String!, $talk: String!, $sms: String!, $speed: Number!, $unlimited: Boolean!, $eu: Number!, $active: Boolean!, $price: String!   ){
    addSubscription(id: $id, operator: $operator, name: $name, talk: $talk, sms: $sms, speed: $speed, unlimited: $unlimited, eu: $eu, active: $active, price: $price){
      ...SubscriptionInfo
    }
  }
  ${SUBSCRIPTION_INFO}
`;

export const DELETE_SUBSCRIPTION = gql`
  mutation deleteSubscription($id: ID!) {
    deleteSubscription(id: $id) {
      name
      id
    }
  }
`;

export const ALL_OPERATORS = gql`
  query {
    allOperators {
      name
      id
    }
  }
`;