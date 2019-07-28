const { GraphQLScalarType, Kind } = require('graphql');
const { Types } = require('mongoose');

const ScalarsTypes = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  ObjectId: new GraphQLScalarType({
    name: 'ObjectId',
    description: 'Mongo ObjectId scalar type',
    parseValue(value) {
      return new Types.ObjectId(value); // value from the client
    },
    serialize(value) {
      return value.toString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Types.ObjectId(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};

module.exports = { ScalarsTypes }
