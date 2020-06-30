const mongoose = require('mongoose')

const travelSchema = new mongoose.Schema({
  location: {
    type: String
  },
  date: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Travel', travelSchema)
