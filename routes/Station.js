const express = require('express');
const router = express.Router();
const controller = require('../controller/StationController');

router.get('/',function(req, res){    
  res.send('Get all stations');
});


module.exports = router;