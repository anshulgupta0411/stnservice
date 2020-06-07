const express = require('express');
const router = express.Router();

router.use('/', function (req, res, next) {
    let logObj = {};
    logObj.params = req.params ? req.params : null;
    logObj.query = req.query ? req.query : null;
    logObj.body = req.body ? req.body : null;
    logObj.url = req.url;
    console.log(logObj);
    next();
});

router.use('/user', require('./User'));
router.use('/customer', require('./Customer'));
router.use('/supplier', require('./Supplier'));
router.use('/station', require('./Station'));
router.use('/report', require('./Report'));
router.use('/auth', require('./Auth'));
router.use('/common', require('./Common'));

module.exports = router;