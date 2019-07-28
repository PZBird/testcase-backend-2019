const fs    = require('fs')
const path  = require('path')

const commonSchema = fs.readFileSync(path.join(__dirname, 'Common.gql'), 'utf8')
const userSchema = fs.readFileSync(path.join(__dirname, 'User.gql'), 'utf8')
const incidentSchema = fs.readFileSync(path.join(__dirname, 'Incident.gql'), 'utf8')

module.exports = [
  commonSchema,
  incidentSchema,
  userSchema
]
