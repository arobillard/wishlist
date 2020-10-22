const express = require('express');
const router = express.Router();

const testData = (req, res) => {

  const data = {
    name: 'Steve',
    cool: true
  }

  res.json(data)
}

router.get('/', testData);

module.exports = router;