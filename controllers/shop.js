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
                    console.log(products)
                    res.render('shop/cart', {
                        pageTitle: 'Shop|Cart',
                        path: '/cart',
                        cartItems: products,
                        cartTotal: 59,
                    })
                })
        })
        .catch(error => console.log(error))

}

const postCart = (req, res, next) => {
    const {productId} = req.body;
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where: {id: productId}});
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0]
            }
            let newQuantity = 1;
            //TODO: Add Product is not working!
            if (product) {
                const oldQuantity = product['cart-item'].quantity
                newQuantity = oldQuantity + 1;
                return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
            }
            return Product.findByPk(productId).then(
                product => {
                    return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
                }
            ).catch(error => console.log(error))
        })
        .catch(error => console.log(error))
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