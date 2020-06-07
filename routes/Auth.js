const express = require('express');
const router = express.Router();
const controller = require('../controller/AuthController');

/* GET */
router.get('/',function(req, res){    
  res.send('Inside Auth');
});

/* PUT */
router.post('/login', function(req, res) {
  // Create user
  res.send('Some response.');
});

/* POST */

/* DELETE */

module.exports = router;