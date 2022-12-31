const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

const getIndex = asyncHandler(async (req, res, next) => {
    const products = await Product.findAll()
    res.render('shop/index', {
        products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
    })
})

const getOrders = asyncHandler(async (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Shop|My Orders'
    })
})

const getProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.findAll()
    res.render('shop/products-list', {
        products,
        pageTitle: 'Shop|Products',
        path: '/product-list',
        hasProducts: products.length > 0,
    });

})

const getProduct = asyncHandler(async (req, res, next) => {
    const {productId} = req.params
    const product = await Product.findByPk(productId)
    res.render('shop/product-detail', {
        product,
        pageTitle: 'Shop|Product',
        path: '/product-list',
    })

})

const getCart = asyncHandler(async (req, res, next) => {
    const cart = await req.user.getCart()
    const products = await cart.getProducts()

    res.render('shop/cart', {
        pageTitle: 'Shop|Cart',
        path: '/cart',
        cartItems: products,
        cartTotal: 59,
    })
})

const postCart = asyncHandler(async (req, res, next) => {
    const {productId} = req.body;
    let cart = req.user.getCart();
    let cartProducts = await cart.getProducts({where: {id: productId}})

    let product;
    let newQuantity = 1;

    if (cartProducts.length > 0) {
        product = cartProducts[0]
    }

    if (product) {
        const oldQuantity = product['cart-item'].quantity
        newQuantity = oldQuantity + 1;
        return await cart.addProduct(product, {through: {quantity: newQuantity}})
    }

    const newProduct = await Product.findByPk(productId)
    cart.addProduct(newProduct, {through: {quantity: newQuantity}});

    res.redirect('/cart')
})

const postDeleteCartItem = asyncHandler(async (req, res, next) => {
    const {productId} = req.body
    //remove item / amount from db
    res.redirect('/cart')
})

const getCheckout = asyncHandler(async (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Shop|Checkout',
        path: '/checkout'
    })
})

module.exports = {getProducts, getIndex, getCart, getCheckout, getOrders, getProduct, postCart, postDeleteCartItem}