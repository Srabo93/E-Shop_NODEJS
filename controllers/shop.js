const products = [{
    title: 'Book1',
    description: 'This Description is absolutely amazing',
    price: 29.99,
    imgUrl: 'https://m.media-amazon.com/images/I/410f-bUBR3L.jpg'
}, {
    title: 'Book2',
    description: 'This Description is absolutely amazing',
    price: 19.99,
    imgUrl: 'https://m.media-amazon.com/images/I/410f-bUBR3L.jpg'
}]
const getIndex = (req, res, next) => {

    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
    })
}

const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Shop|My Orders'
    })
}

const getProducts = (req, res, next) => {

    res.render('shop/products-list', {
        prods: products,
        pageTitle: 'Shop|Products',
        path: '/product-list',
        hasProducts: products.length > 0,
    });
}


const getCart = (req, res, next) => {

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

module.exports = {getProducts, getIndex, getCart, getCheckout, getOrders}