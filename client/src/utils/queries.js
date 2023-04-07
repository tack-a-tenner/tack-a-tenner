import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      bio
      email
      moneyboi
      name
      password
      requests {
        _id
      }
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      bio
      email
      moneyboi
      name
      password
      requests {
        _id
      }
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;

export const QUERY_REQUESTS = gql`
  query allRequests {
    requests {
      _id
      description
      price
      requestAuthor
      requestTitle
      expirationDate
      isActive
      createdAt
    }
  }
`;

export const QUERY_SINGLE_REQUEST = gql`
  query singleRequest($requestId: ID!) {
    request(requestId: $requestId) {
      createdAt
      _id
      description
      expirationDate
      isActive
      price
      requestAuthor
      requestTitle
    }
  }
`;
