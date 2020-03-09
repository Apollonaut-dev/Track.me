const User = require('../models/User');

module.exports.readList = async(req, res, next) => {
  const user = await User.findById(req.userId).populate('trackerList');
  return res.status(200).json(user.trackerList);
}