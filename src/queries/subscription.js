import { gql } from '@apollo/client';
import { SUBSCRIPTION_INFO, SUBSCRIPTION_INFO_WITH_OFFER } from './fragments';

export const ALL_SUBSCRIPTIONS = gql`
  query {
    allSubscriptions {
      ...SubscriptionInfo
    }
  }
  ${SUBSCRIPTION_INFO}
`;

export const ALL_SUBSCRIPTIONS_WITH_OFFER = gql`
  query {
    allSubscriptionsWithOffer {
      ...SubscriptionInfoWithOffer
    }
  }
  ${SUBSCRIPTION_INFO_WITH_OFFER}
`;

export const ALL_ACTIVE_SUBSCRIPTIONS = gql`
  query {
    allActiveSubscriptions {
      ...SubscriptionInfo
    }
  }
  ${SUBSCRIPTION_INFO}
`;

export const GET_SUBSCRIPTIONS_BY_OPERATOR = gql`
  query getSubscriptionsByOperator($id: ID!) {
    getSubscriptionsByOperator(id: $id) {
      name
      id
    }
  }
`;

export const ADD_SUBSCRIPTION = gql`
  mutation addSubscription(
    $operator: String!
    $name: String!
    $talk: String!
    $sms: String!
    $speed: String!
    $unlimited: Boolean!
    $eu: Int!
    $active: Boolean!
    $price: String!
  ) {
    addSubscription(
      operator: $operator
      name: $name
      talk: $talk
      sms: $sms
      speed: $speed
      unlimited: $unlimited
      eu: $eu
      active: $active
      price: $price
    ) {
      ...SubscriptionInfo
    }
  }
  ${SUBSCRIPTION_INFO}
`;

export const EDIT_SUBSCRIPTION = gql`
  mutation modifiSubscription(
    $id: ID!
    $name: String
    $talk: String
    $sms: String
    $speed: String
    $unlimited: Boolean
    $eu: Int
    $active: Boolean
    $price: String
  ) {
    modifySubscription(
      id: $id

      name: $name
      talk: $talk
      sms: $sms
      speed: $speed
      unlimited: $unlimited
      eu: $eu
      active: $active
      price: $price
    ) {
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

export const ADD_OFFER = gql`
  mutation addOffer(
    $id: ID!
    $offer: String!
    $offerLength: Int
    $bindingOffer: Boolean
    $oneTimeDiscount: Int
    $offerValue: Int
  ) {
    addOffer(
      id: $id
      offer: $offer
      offerLength: $offerLength
      bindingOffer: $bindingOffer
      oneTimeDiscount: $oneTimeDiscount
      offerValue: $offerValue
    ) {
      ...SubscriptionInfoWithOffer
    }
  }
  ${SUBSCRIPTION_INFO_WITH_OFFER}
`;

export const REMOVE_OFFER = gql`
  mutation removeOffer($id: ID!) {
    removeOffer(id: $id) {
      id
    }
  }
`;
