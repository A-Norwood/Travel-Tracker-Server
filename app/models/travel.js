const mongoose = require('mongoose')

const travelSchema = new mongoose.Schema({
  location: {
    type: String
  },
  date: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Travel', travelSchema)
