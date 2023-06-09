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
  mutation AddRequest($requestTitle: String!, $description: String!, $price: Int!) {
    addRequest(requestTitle: $requestTitle, description: $description, price: $price) {
      requestTitle
      description
      price
    }
  }
`;

export const UPDATE_REQUEST = gql`
  mutation updateRequest($requestId: ID!, $requestTitle: String, $description: String, $price: Int, $isActive: Boolean) {
    updateRequest(requestId: $requestId, requestTitle: $requestTitle, description: $description, price: $price, isActive: $isActive) {
      _id
      requestTitle
      price
      isActive
      description
    }
  }
`;
