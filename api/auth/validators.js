const { body } = require('express-validator');
const User = require('../models/User');

module.exports.signup =
  [
    body('email')
      .isEmail()
      .withMessage('invalid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('duplicate email');
            }
          });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('short password'),
    body('first_name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('no name')
  ];
