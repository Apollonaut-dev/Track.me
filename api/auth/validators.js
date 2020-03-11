const { body } = require('express-validator');
const User = require('../models/User');

module.exports.signup =
  [
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('no name'),
    body('sex')
      .isIn(['M', 'F'])
      .withMessage('no sex'),
    body('birthdate')
      .exists()
      .customSanitizer(value => Date.parse(value))
      .withMessage('no birthdate'),
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
    body('password_confirmation')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('nonmatching passwords')
  ];
