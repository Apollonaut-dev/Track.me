const Mongoose = require('mongoose');

const TrackerPoint = new Mongoose.Schema({
  trackerId: {
    type: Mongoose.Schema.ObjectId,
    ref: 'Tracker',
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

module.exports = Mongoose.model('TrackerPoint', TrackerPoint);