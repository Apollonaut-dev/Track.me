const Mongoose = require('mongoose');

const Notifier = new Mongoose.Schema({
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trackerId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Tracker',
    required: true,
  },
  /* What time to notify every period */
  phase: {
    type: Date,
    required: true
  },
  /* How long between notifications?
  There will be a pre-determined set of possible values 
  */
  period: {
    type: String,
    required: true
  }
});

module.exports = Mongoose.model('Notifier', Notifier);