const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const expVal = require('express-validator');
const { runValidation } = require('../handlers/errorHandlers');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ err: "Could not find items" })
  }
}

exports.validateItem = [
  expVal.body('name', 'Please supply an item name').exists().trim(),
  expVal.body('desc').trim(),
  // expVal.body('url', 'Please supply a valid URL').trim().isURL(),
  expVal.body('price', 'Please supply a valid price').trim().isCurrency()
]

exports.createItem = (req, res) => {
  runValidation(req, res, async () => {
    const item = new Item({
      name: req.body.name,
      desc: req.body.desc,
      url: req.body.url,
      imgs: req.body.imgs,
      price: req.body.price,
      desireRank: req.body.desireRank,
      exactness: req.body.exactness,
      listRef: req.body.listRef
    });
    let newItem = await item.save();
    res.json(newItem);
  });
}

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json({ err: "Could not find item" })
  }
}

exports.editItem = (req, res) => {
  runValidation(req, res, async () => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(item);
  });
}

exports.deleteItem = async (req, res) => {
  await Item.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err) {
      res.json({ err: 'Unable to find item to delete.' })
    } else {
      res.json({ deleted: docs })
    }
  });
}

