const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/',
  itemController.getAllItems
);
router.post('/create',
  itemController.validateItem,
  itemController.createItem
);
router.get('/:id/',
  itemController.getItem
);
router.post('/:id/edit/',
  itemController.validateItem,
  itemController.editItem
);
router.post('/:id/delete/',
  itemController.deleteItem
);

module.exports = router;