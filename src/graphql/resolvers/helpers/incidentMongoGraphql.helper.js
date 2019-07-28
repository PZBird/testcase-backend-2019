const { FILTER_CONDITION_TYPE } = require('@entria/graphql-mongo-helpers')
const escapeRegex   = require('escape-regex')

const mapping = {
  title: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: val => new RegExp(`^${escapeRegex(val)}`)
  },
  description: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: val => new RegExp(`^${escapeRegex(val)}`)
  },
  assignee: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: val => val
  },
  status: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: val => val
  }
}

module.exports = { mapping }
