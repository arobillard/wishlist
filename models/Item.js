const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const itemSchema = new Schema({
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
  price: {
    type: String,
    validate: [validator.isCurrency, 'Please use valid EN-CAD currency format.'],
    trim: true
  },
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
  status: {
    type: String,
    enum: ['unclaimed', 'reserved', 'purchased', 'gifted'],
    required: 'Please set a valid status',
    default: 'unclaimed'
  }
});

itemSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Item', itemSchema);