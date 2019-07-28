const { buildMongoConditionsFromFilters } = require('@entria/graphql-mongo-helpers')
const User = require('../../models/User')
const Incident = require("../../models/Incident")
const { mapping } = require('./helpers/incidentMongoGraphql.helper')

const getIncidentById = async (_id) => {
  try {
    const incidentToAssign = await Incident.findOne({ _id })
    if (!incidentToAssign) throw new Error("Can't find incident to assign")
    return incidentToAssign
  } catch (error) {
    throw new Error(error.message);
  }
}

const changeStatus = async(incident, status) => {
  incident.status = status;
  return await incident.save();
}

const IncidentQueries = {
  getIncidents: async (ctx, { input }) => {
    const {
      filter,
      orderBy,
      sortDirection = 'ASC',
      page = 1,
      pageSize  = 25
    } = input || { }
    order = orderBy
    if ( !!order) {
      if (sortDirection === 'DESC') {
        order = `-${order}`
      }
    }
    const filterResult = buildMongoConditionsFromFilters({}, filter, mapping)
    const count = await Incident.countDocuments(filterResult.conditions)
    const totalPage = Math.floor(count/pageSize) + 1
    if ( page > totalPage ) {
      throw new Error('oversize page')
    }
    const currentPage = page
    return {
        items: await Incident
          .find(filterResult.conditions)
          .sort(order)
          .skip((currentPage-1)*pageSize)
          .limit(pageSize),
        count,
        currentPage,
        totalPage
      }
  },

  getIncident: (ctx, { input }) => 
    Incident.findOne({_id: input._id})
};

const IncidentMutations = {

  createIncident: async (ctx, { input }) => {
    const incidentToInsert = new Incident(input);
    const engineer = await User.findOne({role: 'Engineer'})
    if (!engineer) {
      throw new Error("Can't find engineer");
    }
    incidentToInsert.assignee = engineer.email;
    return await incidentToInsert.save();
  },

  assignIncident: async (ctx, { input }) => {
    const { _id, email } = input
    const incidentToAssign = await getIncidentById(_id)
    const userToAssign = await User.findOne({ email })
    if (!userToAssign) {
      throw new Error("Can't find user to assign");
    }
    incidentToAssign.assignee = email;
    return await incidentToAssign.save();
  },

  acknowledgeIncident: async (ctx, { input }) => {
    const { _id } = input
    const incidentToAssign = await getIncidentById(_id)
    return await changeStatus(incidentToAssign, 'Acknowledged')
  },

  resolveIncident: async (ctx, { input }) => {
    const { _id } = input
    const incidentToAssign = await getIncidentById(_id)
    return await changeStatus(incidentToAssign, 'Resolved')
  },

  removeIncident: async (ctx, { input }) => {
    const { _id } = input
    return await Incident.findByIdAndDelete(_id)
  }
};

module.exports = { IncidentQueries, IncidentMutations }
