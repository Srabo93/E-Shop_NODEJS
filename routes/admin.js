const express = require('express');
const {getAddProduct, postAddProduct, getProducts, getEditProduct} = require('../controllers/admin')
const router = express.Router();


router.route('/add-product').get(getAddProduct).post(postAddProduct)
router.route('/edit-product/:productId').get(getEditProduct)
router.route('/products-list').get(getProducts)

module.exports = router;