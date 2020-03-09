const Express = require('express');
const Router = Express.Router();

const validate = require('../auth/validators');
const auth = require('../auth/auth');

Router.post(
  '/signup', 
  validate.signup, 
  auth.signup
  );

Router.post('/signin', auth.signin);

module.exports = Router;