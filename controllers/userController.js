const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const expVal = require('express-validator');
const { runValidation } = require('../handlers/errorHandlers');

exports.valTest = (req, res) => {
  const errs = expVal.validationResult(req);
  res.json({ body: req.body, errs: errs.errors})
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ err: "Could not find users" })
  }
}

//////// Sign Up

exports.validateSignUp = [
  expVal.body('fName', 'Please supply you first name').exists().trim(),
  expVal.body('lName', 'Please supply you last name').exists().trim(),
  expVal.body('email', 'Please supply a valid email').trim().isEmail().normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  }),
  expVal.body('password', 'Password cannot be blank!').exists().isLength({ min: 5 }).withMessage('Password must be 5 or more characters')
]

exports.signUp = async (req, res, next) => {
  runValidation(req, res, async () => {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const user = new User({
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        password: hash
      });
      try {
        let newUser = await user.save();
        res.json(newUser);
      } catch {
        res.status(400).json({ err: 'Email address is unavailable.'});
      }
    });
  });
}

//////// Sign In

exports.validateSignIn = [
  expVal.body('email', 'Please supply a valid email').trim().isEmail().normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  }),
  expVal.body('password', 'Password cannot be blank!').exists().isLength({ min: 5 }).withMessage('Password must be 5 or more characters')
]

exports.signIn = async (req, res) => {
  runValidation(req, res, async () => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      bcrypt.compare(req.body.password, user.password)
        .then(function(result) {
          if (result) {
            res.json(user)
          } else {
            res.json({ err: "Invalid email or password."})
          }
        })
    } else {
      res.json({ err: "Email or password invalid." })
    }
  });
}

//////// Get User

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ err: "Could not find user" })
  }
}

//////// Edit User

exports.validateEditUser = [
  expVal.body('fName', 'Please supply you first name').exists().trim(),
  expVal.body('lName', 'Please supply you last name').exists().trim(),
  expVal.body('email', 'Please supply a valid email').trim().isEmail().normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
]

exports.editUser = async (req, res) => {

  runValidation(req, res, async () => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(user);
  });

}
