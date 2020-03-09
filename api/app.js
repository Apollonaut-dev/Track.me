const Express = require('express');
const App = Express();

const BodyParser = require('body-parser');

App.use(BodyParser.json());

App.use((req, res, next) => {
  console.log(req.url);
  next();
})

/* Allow CORS */
App.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/* API endpoints */
App.use('/auth', require('./routes/auth'));
App.use('/trackers', require('./routes/trackers'));

/* Error handling and logging */  
App.use((error, req, res, next) => {
  console.error('Caught error!\n', error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

module.exports = App;