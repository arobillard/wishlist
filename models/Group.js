const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const groupSchema = new Schema({
  name: {
    type: String,
    required: 'Please supply a name for the group.',
    trim: true
  },
  desc: {
    type: String,
    trim: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  invitedUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  archived: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: "There must be an admin user."
  }
});

groupSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Group', groupSchema);