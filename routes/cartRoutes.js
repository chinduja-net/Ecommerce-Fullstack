const express = require('express');

//importing into a cartcontroller
const cartController = require('./../controllers/cartController');

//creating new router and saving it in a variable
const router = express.Router();

router
  .route('/:id')
  .post(cartController.addToCart)
  .delete(cartController.deleteCart);

router
  .route('/')
  .get(cartController.displayCart);

//export the router
module.exports = router;
