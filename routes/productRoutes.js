const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts);
router
  .route('/:name')
  .get(productController.getFilteredProduct);
module.exports = router;