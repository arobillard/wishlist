const mongoose = require('mongoose');
const Group = mongoose.model('Group');
const expVal = require('express-validator');
const { runValidation } = require('../handlers/errorHandlers');

exports.validateGroup = [
  expVal.body('name', 'Please supply an list name').exists().trim(),
  expVal.body('desc').trim(),
  expVal.body('admin', "An admin user must be set").exists()
]

exports.createGroup = async (req, res) => {
  runValidation(req, res, async () => {
    const group = new Group({
      name: req.body.name,
      desc: req.body.desc,
      admin: req.body.admin
    })
    let newGroup = await group.save();
    res.json(newGroup);
  });
}

exports.getGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    res.json(group);
  } catch (err) {
    res.status(500).json({ err: "Could not find group" })
  }
}

exports.editGroup = async (req, res) => {
  runValidation(req, res, async () => {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(group);
  });
}

exports.deleteGroup = async (req, res) => {
  await Group.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err) {
      res.json({ err: 'Unable to find group to delete.' })
    } else {
      res.json({ deleted: docs })
    }
  });
}