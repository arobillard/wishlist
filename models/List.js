const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const listSchema = new Schema({
  name: {
    type: String,
    required: 'Please supply a name for the list.',
    trim: true
  },
  desc: {
    type: String,
    trim: true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  archived: {
    type: Boolean,
    default: false
  }
});

listSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('List', listSchema);