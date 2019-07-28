const User = require("../../models/User");

const UserQuery = {
  getUsers: (ctx, { input }) => User.find(input),
  getUser: (ctx, { input }) => 
    User.findOne({_id: input._id})
};

module.exports = { UserQuery }
