const express = require('express');
const {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    postEditProduct,
    deleteProduct
} = require('../controllers/admin')
const router = express.Router();


router.route('/add-product').get(getAddProduct).post(postAddProduct)
router.route('/edit-product/:productId').get(getEditProduct)
router.route('/edit-product').post(postEditProduct)
router.route('/delete-product').post(deleteProduct)
router.route('/products-list').get(getProducts)

module.exports = router;