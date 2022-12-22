const express = require('express');
const {getProducts, getIndex, getCart, getCheckout} = require("../controllers/shop");
const router = express.Router();

router.route('/').get(getIndex)

router.route('/products').get(getProducts)
router.route('/cart').get(getCart)
router.route('/checkout').get(getCheckout)

module.exports = router;