const express = require('express');
const router = express.Router();

router.all('/', (req, res, next) => {
  res.send('Esto es una API!');
});


module.exports = router;