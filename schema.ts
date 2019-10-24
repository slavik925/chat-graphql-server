import { gql } from 'apollo-server';

export const typeDefs = gql`

  type User {
    username: String!
    password: String!
  }

  type Channel {
    id: ID!
    name: String!
    messages: [Message]!
  }

  type Message {
    user: User!
    content: String!
    createdAt: Float!
  }

  type Query {
    channels: [Channel]
    channel(id: ID!): Channel
    currentUser: User
  }

  type Subscription {
    messageAdded(channelId: ID!): Message
  }

  type LoginResponse {
    token: String
    user: User
  }

  type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
    createChannel(name: String!): Channel!
    createMessage(channelId: ID!, content: String!): Message!
  }
`;