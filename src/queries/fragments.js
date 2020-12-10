import { gql } from '@apollo/client';

export const SUBSCRIPTION_INFO = gql`
  fragment SubscriptionInfo on Subscription {
    operator {
      name
      id
    }
    active
    name
    talk
    sms
    speed
    unlimited
    eu
    hasOffer
    price    
    equivelentSub {
      name
    }    
    id
  }
`;

export const SUBSCRIPTION_INFO_WITH_OFFER = gql`
  fragment SubscriptionInfoWithOffer on Subscription {
    operator {
      name
    }
    active
    name
    talk
    sms
    speed
    unlimited
    eu
    price
    hasOffer
    offer
    offerLength
    bindingOffer
    offerValue
    oneTimeDiscount
    equivelentSub {
      name
    }    
    id
  }
`;

export const NET_SUBSCRIPTION_INFO = gql`
  fragment NetSubscriptionInfo on NetSubscription {
    operator {
      name
      id
    }
    active
    name
    type
    speed
    eu
    hasOffer
    price      
    id
  }
`;


export const NET_SUBSCRIPTION_INFO_WITH_OFFER = gql`
  fragment NetSubscriptionInfoWithOffer on NetSubscription {
    operator {
      name
    }
    active
    name
    type
    speed
    eu
    price
    hasOffer
    offer
    offerLength
    bindingOffer
    offerValue
    oneTimeDiscount
    id
  }
`;
