const {
  IncidentQueries,
  IncidentMutations
} = require('./incident')
const { UserQuery }     = require('./user')
const { ScalarsTypes }  = require('./scalars')

const resolvers = {
  ...ScalarsTypes,
  Query: {
    ...UserQuery,
    ...IncidentQueries
  },
  Mutation: {
    ...IncidentMutations
  }
}

module.exports = {
  resolvers
}
