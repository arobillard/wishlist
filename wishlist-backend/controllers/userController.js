const mongoose = require('mongoose');
// const User = mongoose.model('User');
const { promisify } = require('es6-promisify');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signIn = async (req, res, next) => {
  try {
    req.sanitizeBody('email').normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
    });
    const user = await User.findOne({ email: req.body.email });
    bcrypt.compare(req.body.password, user.password)
      .then(function(result) {
        if (result) {
          res.json(user)
        } else {
          res.json({ err: "Passwords do not match!"})
        }
      })
      .catch(err => {
        res.json({ err });
      })
  } catch (err) {
    res.json({err: "Unable to log in."});
  }
}

exports.validateUser = async (req, res, next) => {
  req.sanitizeBody('fName');
  req.sanitizeBody('lName');
  req.checkBody('fName', 'You must supply a name!').notEmpty();
  req.checkBody('lName', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'You must supply a email!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Password confirm cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Password confirm has to match!').equals(req.body.password);
  
  const errors = req.validationErrors();
  if (errors) {
    let errs = []
    errors.forEach(err => {
      errs.push(err.msg);
    })
    res.json({ err: errs });
    return;
  }
  next();
}

exports.signUp = async (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const user = new User({
      email: req.body.email,
      fName: req.body.fName,
      lName: req.body.lName,
      password: hash
    });
    try {
      let newUser = await user.save();
      console.log(newUser, user);
      next();
    } catch {
      res.status(400).json({ err: 'Email taken!'});
    }
    // res.json(newUser);
  });
}