import { gql } from '@apollo/client';

export const SUBSCRIPTION_INFO = gql`
  fragment SubscriptionInfo on Subscription {
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
    equivelentSub {
      name
    }    
    id
  }
`;
