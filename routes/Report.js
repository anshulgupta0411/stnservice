const express = require('express');
const router = express.Router();
const controller = require('../controller/ReportController');
router.get('/',function(req, res){    
  res.send('Get all reports.');
});

router.post('/', function(req, res) {
  // Create user
  res.send('Some response.');
});

module.exports = router;