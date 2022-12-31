const Product = require('../models/Product')

const getIndex = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('shop/index', {
            products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
        })
    }).catch(error => console.log(error));
}

const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Shop|My Orders'
    })
}

const getProducts = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('shop/products-list', {
            products,
            pageTitle: 'Shop|Products',
            path: '/product-list',
            hasProducts: products.length > 0,
        });
    }).catch(error => console.log(error));
}

const getProduct = (req, res, next) => {
    const {productId} = req.params
    Product.findByPk(productId).then((product) => {
        res.render('shop/product-detail', {
            product,
            pageTitle: 'Shop|Product',
            path: '/product-list',
        })
    }).catch(err => console.log(err))
}

const getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        products,
                        pageTitle: 'Shop|Cart',
                        path: '/cart',
                        cartItems: cart.products,
                        cartTotal: cart.totalPrice,
                    })
                })
        })
        .catch(error => console.log(error))

}

const postCart = (req, res, next) => {
    const {productId} = req.body;
    console.log(productId)
    res.redirect('/cart')
}

const postDeleteCartItem = (req, res, next) => {
    const {productId} = req.body
    //remove item / amount from db
    res.redirect('/cart')
}

const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Shop|Checkout',
        path: '/checkout'
    })
}

module.exports = {getProducts, getIndex, getCart, getCheckout, getOrders, getProduct, postCart, postDeleteCartItem}