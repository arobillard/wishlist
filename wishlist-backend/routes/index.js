const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

const sayHello = (req, res) => {
  res.json({
    name: "adam"
  })
}

router.get('/', sayHello);

// Sign In
router.post('/users/sign-in', userController.signIn);

// Sign Up
router.post('/users/sign-up',
  userController.validateUser,
  userController.signUp,
  userController.signIn
);

module.exports = router;