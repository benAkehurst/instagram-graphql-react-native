const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Photo {
    id: ID!
    url: String!
    user: User!
    caption: String!
    favoriteCount: Int!
    favoritedBy: [User]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PhotoFeed {
    photos: [Photo]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    photos: [Photo!]!
    favorites: [Photo!]!
  }

  type Query {
    photos: [Photo!]!
    photo(id: ID): Photo!
    photoFeed(cursor: String): PhotoFeed
    user(username: String!): User
    users: [User!]!
    me: User!
  }

  type Mutation {
    uploadPhoto(file: Upload!, caption: String!): Photo
    deletePhoto(id: ID!): Boolean!
    updatePhotoCaption(id: ID!, caption: String): Photo!
    updateUserAvatar(id: ID!, file: Upload!): User
    toggleFavorite(id: ID!): Photo!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;
