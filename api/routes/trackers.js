const Express = require('express');
const Router = Express.Router();

const { isAuth } = require('../auth/middleware');

const trackers = require('../controllers/trackers');

Router.get('/trackers', isAuth, trackers.readList);

// Router.post('/trackers', isAuth, trackers.create);
// Router.get('/trackers/:trackerId', isAuth, trackers.read);
// Router.put('/trackers/:trackerId', isAuth, trackers.update);
// Router.delete('/trackers/:trackerId', isAuth, trackers.delete);

// /* For individual datapoints */
// Router.post('/trackers/:trackerId/data', isAuth, trackers.createDataPoint);
// Router.delete('/trackers/:trackerId/data/:dataEntryId', isAuth, trackers.deleteDataPoint);

module.exports = Router;