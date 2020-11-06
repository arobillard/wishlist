const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/sign-up',
  userController.validateSignUp,
  userController.signUp
);
router.post('/sign-in',
  userController.validateSignIn,
  userController.signIn
);
router.get('/:id', userController.getUser);
router.post('/:id',
  userController.validateEditUser,
  userController.editUser
);
router.post('/:userId/add-list/:listId', userController.addList);
router.post('/:userId/add-item/:itemId', userController.addItem);
router.post('/:userId/remove-item/:itemId', userController.removeItem);

module.exports = router;