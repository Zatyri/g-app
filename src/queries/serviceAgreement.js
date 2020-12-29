import { gql } from '@apollo/client';
import { SA_INFO } from './fragments';

export const ALL_SERVICE_AGREEMENTS = gql`
  query {
    allServiceAgreements {
      ...ServiceAgreementInfo
    }
  }
  ${SA_INFO}
`;

export const ADD_SERVICE_AGREEMENT = gql`
  mutation addServiceAgreement(
    $type: String!
    $name: String!
    $antiVirus: String!
    $antiVirusAmount: Int!
    $VPN: Boolean!
    $VPNAmount: Int!
    $cloud: String!
    $cloudLimit: String!
    $office365: Boolean!
    $support: Boolean!
    $remoteFix: Boolean!
    $length: Int!
    $price: String!
  ) {
    addServiceAgreement(
      type: $type
      name: $name
      antiVirus: $antiVirus
      antiVirusAmount: $antiVirusAmount
      VPN: $VPN
      VPNAmount: $VPNAmount
      cloud: $cloud
      cloudLimit: $cloudLimit
      office365: $office365
      support: $support
      remoteFix: $remoteFix
      length: $length
      price: $price
    ) {
      ...ServiceAgreementInfo
    }
  }
  ${SA_INFO}
`;

export const EDIT_SERVICE_AGREEMENT = gql`
  mutation modifyServiceAgreement(
    $id: ID!
    $type: String
    $name: String
    $antiVirus: String
    $antiVirusAmount: Int
    $VPN: Boolean
    $VPNAmount: Int
    $cloud: String
    $cloudLimit: String
    $office365: Boolean
    $support: Boolean
    $remoteFix: Boolean
    $length: Int!
    $price: String!
  ) {
    modifyServiceAgreement(
      id: $id
      type: $type
      name: $name
      antiVirus: $antiVirus
      antiVirusAmount: $antiVirusAmount
      VPN: $VPN
      VPNAmount: $VPNAmount
      cloud: $cloud
      cloudLimit: $cloudLimit
      office365: $office365
      support: $support
      remoteFix: $remoteFix
      length: $length
      price: $price
    ) {
      ...ServiceAgreementInfo
    }
  }
  ${SA_INFO}
`;

export const DELETE_SERVICE_AGREEMENT = gql`
  mutation deleteServiceAgreement($id: ID!) {
    deleteServiceAgreement(id: $id) {
      name
      id
    }
  }
`;
