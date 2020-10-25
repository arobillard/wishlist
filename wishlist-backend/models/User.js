const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: "Please supply an email address!"
  },
  fName: {
    type: String,
    require: 'Please supply a first name',
    trim: true
  },
  lName: {
    type: String,
    require: 'Please supply a last name',
    trim: true
  },
  password: {
    type: String,
    require: 'Please supply a password'
  },
  lists: [{
    name: {
      type: String,
      required: 'Please supply a name for the list.',
      trim: true
    },
    desc: {
      type: String,
      trim: true
    },
    // groupRefs: [{
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Group'
    // }],
    items: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    archived: {
      type: Boolean,
      default: false
    }
  }],
  // groups: [{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Group'
  // }],
  // groupsInvites: [{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Group'
  // }],
  items: [{
    name: {
      type: String,
      required: 'Please supply a name for the item.',
      trim: true
    },
    desc: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      validate: [validator.isURL, 'Please supply a valid URL.'],
      trim: true
    },
    imgs: [String],
    price: Number,
    desireRank: {
      type: Number,
      min: 1,
      max: 10,
      default: 5
    },
    exactness: {
      type: Boolean,
      default: true
    },
    listRef: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    status: {
      type: String,
      enum: ['unclaimed', 'reserved', 'purchased', 'gifted'],
      required: 'Please set a valid status',
      default: 'unclaimed'
    }
  }],
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);