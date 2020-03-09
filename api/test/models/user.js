require('dotenv').config()

const mocha = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const Mongoose = require('mongoose');

const User = require('../../models/User');
// TODO Setup local testing database
describe('Testing User model', () => {
  before(async () => {
    await Mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0-w9nbv.mongodb.net/trackme?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  });

  after(async () => {
    await User.deleteOne();
    await Mongoose.disconnect();
  });

  it('should save and retrieve a user', async () => {
    let user = new User({
      first_name: 'test_first_name',
      last_name: 'test_last_name',
      email: 'test_email@domain.com',
      birthdate: Date.now()
    });
    await user.save();
    let users = await User.find();
    expect(users[0].email).to.be.equal('test_email@domain.com');
  });
})
