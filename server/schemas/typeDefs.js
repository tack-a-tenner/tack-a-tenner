const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    moneyboi: Boolean
    bio: String
    skills: [String]
    requests: [Request]
  }
  type Request {
    _id: ID
    requestTitle: String
    requestAuthor: String
    createdAt: String
    description: String
    price: Int
    willExpire: Boolean
    expirationDate: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!, moneyboi: Boolean!): Auth
    login(email: String!, password: String!): Auth

    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile: Profile
    removeSkill(skill: String!): Profile

    addRequest(requestTitle: String!, description: String!, price: Int!, willExpire: Boolean, expirationDate: String): Request

    updateMoneyboi(moneyboi: Boolean!): Profile
  }
`;

module.exports = typeDefs;
