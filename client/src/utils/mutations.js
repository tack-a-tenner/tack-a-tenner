import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation AddProfile($name: String!, $email: String!, $password: String!, $moneyboi: Boolean!) {
    addProfile(name: $name, email: $email, password: $password, moneyboi: $moneyboi) {
      profile {
        email
        name
        password
        moneyboi
        _id
      }
      token
    }
  }
`;

export const ADD_SKILL = gql`
  mutation addSkill($profileId: ID!, $skill: String!) {
    addSkill(profileId: $profileId, skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SKILL = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const ADD_REQUEST = gql`
  mutation AddRequest($requestTitle: String!, $description: String!, $price: Int!, $expirationDate: String) {
    addRequest(requestTitle: $requestTitle, description: $description, price: $price, expirationDate: $expirationDate) {
      requestTitle
      description
      price
      expirationDate
    }
  }
`;

export const UPDATE_REQUEST = gql`
  mutation UpdateRequest($requestId: ID!) {
    updateRequest(requestId: $requestId) {
      requestTitle
      description
      price
      isActive
      expirationDate
    }
  }
`;
