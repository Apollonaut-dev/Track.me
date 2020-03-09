require('dotenv').config()

const PORT = process.env.PORT || 3000;
const Mongoose = require('mongoose');

const App = require('./app');

Mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0-w9nbv.mongodb.net/trackme?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas...');
    App.listen(PORT);
    console.log(`Listening on port ${PORT}...`);
  })
  .catch(err => {
    console.log(err);
    // TODO
    // do some CI stuff, maybe fallback to older version?
    // make sure somebody knows about failure
  });


