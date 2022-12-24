const express = require('express');
const {getProducts, getIndex, getCart, getCheckout, getOrders, getProduct, postCart} = require("../controllers/shop");
const router = express.Router();

router.route('/').get(getIndex)

router.route('/products').get(getProducts)
router.route('/products/:productId').get(getProduct)
router.route('/cart').get(getCart).post(postCart)
router.route('/checkout').get(getCheckout)
router.route('/orders').get(getOrders)

module.exports = router;