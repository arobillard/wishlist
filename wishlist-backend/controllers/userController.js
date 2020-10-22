const mongoose = require('mongoose');
// const User = mongoose.model('User');
const promisify = require('es6-promisify');
const User = require('../models/User');

exports.signUp = async (req, res, next) => {
  const user = new User(req.body);
  try {
    let newUser = await user.save();
    console.log(newUser, user);
  } catch {
    res.status(400).json({ err: 'Email taken' });
  }
  res.send('added!');
}