const express = require('express');
const router = express.Router();
const controller = require('../controller/SupplierController');
router.get('/',function(req, res){    
  res.send('Get all suppliers.');
});

router.post('/', function(req, res) {
  // Create user
  res.send('Some response.');
});

module.exports = router;