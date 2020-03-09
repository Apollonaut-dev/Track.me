const Mongoose = require('mongoose');

const Tracker = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  last_record: Date,
  snapshot_image_path: String,
  time_series:
    [
      {
        type: Mongoose.Schema.ObjectId,
        ref: 'TrackerPoint'
      }
    ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = Mongoose.model('Tracker', Tracker);