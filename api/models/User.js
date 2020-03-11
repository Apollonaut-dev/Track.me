const Mongoose = require('mongoose');

const User = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  trackerList: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Tracker'
    }
  ]
});

module.exports = Mongoose.model('User', User);