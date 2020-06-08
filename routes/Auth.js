const express = require('express');
const router = express.Router();
const controller = require('../controller/AuthController');

/* GET */
/* PUT */

/* POST */
router.post('/login', controller.login);

/* DELETE */

module.exports = router;