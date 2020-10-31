const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/create',
  groupController.validateGroup,
  groupController.createGroup
);
router.get('/:id', groupController.getGroup);
router.post('/:id/edit', 
  groupController.validateGroup,
  groupController.editGroup
);
router.post('/:id/delete', 
  groupController.deleteGroup
);

module.exports = router;