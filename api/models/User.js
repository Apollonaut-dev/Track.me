const Mongoose = require('mongoose');

const User = new Mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  // last_name: {
  //   type: String,
  //   required: true,
  // },
  // sex: {
  //   type: Boolean,
  //   required: true
  // },
  email: {
    type: String,
    required: true,
  },
  // birthdate: {
  //   type: Date,
  //   required: true
  // },
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