const express = require('express');
const {
    getProducts,
    getIndex,
    getCart,
    getCheckout,
    getOrders,
    getProduct,
    postCart,
    postDeleteCartItem, postOrder,
} = require("../controllers/shop");
const router = express.Router();

router.route('/').get(getIndex)

router.route('/products').get(getProducts)
router.route('/products/:productId').get(getProduct)
router.route('/cart').get(getCart).post(postCart)
router.route('/cart-delete-item').post(postDeleteCartItem)
router.route('/checkout').get(getCheckout)
router.route('/orders').get(getOrders)
router.route('/create-order').post(postOrder)

module.exports = router;