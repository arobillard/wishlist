const mongoose = require('mongoose');
const List = mongoose.model('List');
const expVal = require('express-validator');
const { runValidation } = require('../handlers/errorHandlers');

exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ err: "Could not find lists" })
  }
}

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

exports.getListCollection = async (req, res) => {
  try {
    const lists = await List.find({ '_id': { $in: [...req.body] } })
    res.json(lists);
  } catch {
    res.json({ err: "Unable to find lists." })
  }
}

exports.addItem = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list.items.includes(req.params.itemId)) {
      list.items.push(req.params.itemId);
      let updatedUser = await list.save();
      res.json(updatedUser);
    } else {
      res.json({ err: 'Item is already on this list!' })
    }
  } catch (err) {
    res.status(500).json({ err: "Could not add item to list." })
  }
}

exports.removeItem = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (list.items.includes(req.params.itemId)) {
      const index = list.items.indexOf(req.params.itemId)
      list.items.splice(index, index + 1);
      let updatedList = await list.save();
      res.json(updatedList);
    } else {
      res.json({ err: 'List does not have this item!' })
    }
  } catch (err) {
    res.status(500).json({ err: "Could not remove item from list." })
  }
}