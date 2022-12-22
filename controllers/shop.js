const getIndex = (req, res, next) => {
    const products = ['Book1', 'Book2']

    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
    })
}


const getProducts = (req, res, next) => {
    const products = ['Book1']
    res.render('shop/products-list', {
        prods: products,
        pageTitle: 'Shop|Products',
        path: '/product-list',
        hasProducts: products.length > 0,
    });
}


const getCart = (req, res, next) => {
    const products = ['Book1']

    res.render('shop/cart', {
        prods: products,
        pageTitle: 'Shop|Cart',
        path: '/cart',
    })
}

const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Shop|Checkout',
        path: '/checkout'
    })
}

module.exports = {getProducts, getIndex, getCart, getCheckout}