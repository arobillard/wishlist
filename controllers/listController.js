const mongoose = require('mongoose');
const List = mongoose.model('List');
const expVal = require('express-validator');
const { runValidation } = require('../handlers/errorHandlers');

exports.validateList = [
  expVal.body('name', 'Please supply an list name').exists().trim(),
  expVal.body('desc').trim()
]

exports.createList = (req, res) => {
  runValidation(req, res, async () => {
    const list = new List({
      name: req.body.name,
      desc: req.body.desc
    })
    let newList = await list.save();
    res.json(newList);
  });
}

exports.getList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.json(list);
  } catch (err) {
    res.status(500).json({ err: "Could not find list" })
  }
}

exports.editList = async (req, res) => {
  runValidation(req, res, async () => {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(list);
  });
}

exports.deleteList = async (req, res) => {
  await List.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err) {
      res.json({ err: 'Unable to find list to delete.' })
    } else {
      res.json({ deleted: docs })
    }
  });
}
