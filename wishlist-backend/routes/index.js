const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const sayHello = (req, res) => {
  res.json({
    name: "adam"
  })
}

router.get('/', sayHello);

// Sign Up
router.post('/users/sign-up', userController.signUp);

module.exports = router;