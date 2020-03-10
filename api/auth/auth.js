const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = async (req, res, next) => {
  try {
    const validation = validationResult(req);
    if (validation.errors.length) {
      const error = new Error('validation failed');
      error.statusCode = 422;
      error.data = [...validation.errors];
      throw error;
    }

    const email = req.body.email;
    const first_name = req.body.first_name;
    const password = req.body.password;

    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      first_name: first_name
    });
    const result = await user.save();
    res.status(201).json({ message: 'User created!', userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  return;
};

module.exports.signin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  try {
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    const passIsValid = await bcrypt.compare(password, user.password);
    if (!passIsValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: user._id.toString() });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
  return;
}

module.exports.signout = async (req, res, next) => {
  // TODO 
  // possible implementation:
  // keep a collection of valid and/or invalidated tokens and query them on login, invalidate on logout, and after verifying check still valid
}