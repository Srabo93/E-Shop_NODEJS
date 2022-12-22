const express = require('express');
const {getAddProduct, postAddProduct, getProducts} = require('../controllers/admin')
const router = express.Router();


router.route('/add-product').get(getAddProduct).post(postAddProduct)
router.route('/products-list').get(getProducts)

module.exports = router;