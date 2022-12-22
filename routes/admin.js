const express = require('express');
const {getAddProduct, postAddProduct} = require('../controllers/products')
const router = express.Router();


router.route('/add-product').get(getAddProduct).post(postAddProduct)


module.exports = router;