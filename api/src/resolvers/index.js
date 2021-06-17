const Query = require('./query');
const Mutation = require('./mutation');
const Photo = require('./photo');
const User = require('./user');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query,
  Mutation,
  Photo,
  User,
  DateTime: GraphQLDateTime
};
