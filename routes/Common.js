const express = require('express');
const router = express.Router();
const controller = require('../controller/CommonController');
router.get('/',function(req, res){    
  res.send('Inside Common');
});

router.post('/login', function(req, res) {
  // Create user
  res.send('Some response.');
});

module.exports = router;