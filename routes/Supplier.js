const express = require('express');
const router = express.Router();
const controller = require('../controller/SupplierController');


/**GET  */
router.get('/', controller.getAll);
router.get('/:id', controller.getDetails);

/* POST */
router.post('/', controller.create);

/* PUT */
router.put('/:id', controller.update);

/* DELETE */
router.delete('/:id', controller.delete);

module.exports = router;