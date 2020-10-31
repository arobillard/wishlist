const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

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

module.exports = router;