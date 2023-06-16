const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts); // get product
router.get('/:id', productController.getProductById); // get product


module.exports = router;