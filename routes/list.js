const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.get('/', listController.getAllLists);
router.post('/create',
  listController.validateList,
  listController.createList
);
router.get('/:id', listController.getList);
router.post('/:id/edit', 
  listController.validateList,
  listController.editList
);
router.post('/:id/delete', 
  listController.deleteList
);

module.exports = router;