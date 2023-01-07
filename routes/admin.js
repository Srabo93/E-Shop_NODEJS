const express = require('express');
const {isAuthenticated} = require('../middlewares/auth')
const router = express.Router();
const {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    postEditProduct,
    deleteProduct
} = require('../controllers/admin')


router.route('/add-product').get(isAuthenticated, getAddProduct).post(postAddProduct)
router.route('/edit-product/:productId').get(isAuthenticated, getEditProduct)
router.route('/edit-product').post(isAuthenticated, postEditProduct)
router.route('/delete-product').post(isAuthenticated, deleteProduct)
router.route('/products-list').get(isAuthenticated, getProducts)

module.exports = router;