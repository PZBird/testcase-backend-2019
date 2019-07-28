const mongoose = require('mongoose')

const IncidentSchema = new mongoose.Schema({
  title:     {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  assignee: {
    type:     String,
    required: true
  },
  status:   {
    type: String,
    enum: ['Created', 'Acknowledged', 'Resolved']
  }
}, { timestamps: true })

IncidentSchema.pre('save', function (next) {
  if (this.isNew) {
      this.status = 'Created'
  }
  next();
});

const Incident = mongoose.model('Incident', IncidentSchema)

module.exports = Incident
