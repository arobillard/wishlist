const mongoose = require('mongoose');
const User = mongoose.model('User');
// const { promisify } = require('es6-promisify');
const bcrypt = require('bcrypt');
// const { update } = require('../models/User');
const saltRounds = 10;
// const passport = require('passport');
// const { validationError } = '../handlers/errorHandlers';

const validationError = (res, error) => {
  let errNames = [];
  let errKeys = Object.keys(error.errors);
  errKeys.forEach(key => {
    const keyParts = key.split('.');
    const errName = keyParts[keyParts.length - 1];
    errNames.push(`Please provide a valid ${errName}.`);
  })
  res.status(500).json({ err: errNames });
}

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
          res.json({ err: "Invalid email or password."})
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

exports.createList = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId })
    const listInfo = {
      name: req.body.name,
      desc: req.body.desc
    }
    user.lists.push(listInfo)
    let updatedUser = await user.save();
    res.json(updatedUser);
  } catch {
    res.status(500).json({ err: "Unable to create list." })
  }
}

exports.updateList = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId })
    const list = user.lists.find(list => list._id = req.body.listId);
    list.name = req.body.name;
    list.desc = req.body.desc;
    list.archived = req.body.archived;
    let updatedUser = await user.save();
    res.json(updatedUser);
  } catch {
    res.status(500).json({ err: "Unable to update list." })
  }
}

exports.createItem = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId })
    const itemInfo = {
      name: req.body.name,
      desc: req.body.desc,
      url: req.body.url,
      imgs: req.body.imgs,
      price: req.body.price,
      desireRank: req.body.desireRank,
      exactness: req.body.exactness,
      listRef: req.body.listRef
    }
    user.items.push(itemInfo)
    let updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    validationError(res, error);
  }
}

exports.updateItem = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId })
    const item = user.items.find(item => item._id == req.body.itemId);
    item.name = req.body.name;
    item.desc = req.body.desc;
    item.url = req.body.url;
    item.imgs = req.body.imgs;
    item.price = req.body.price;
    item.desireRank = req.body.desireRank;
    item.exactness = req.body.exactness;
    item.listRef = req.body.listRef;
    item.status = req.body.status;
    let updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    validationError(res, error);
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId })
    const updatedItems = user.items.filter(item => item._id != req.body.itemId);
    user.items = updatedItems;
    let updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    validationError(res, error);
  }
}