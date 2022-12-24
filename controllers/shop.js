const products = [{
    title: 'Book1',
    description: 'This Description is absolutely amazing',
    price: 29.99,
    imgUrl: 'https://m.media-amazon.com/images/I/410f-bUBR3L.jpg',
    id: 1
}, {
    title: 'Book2',
    description: 'This Description is absolutely amazing',
    price: 19.99,
    imgUrl: 'https://m.media-amazon.com/images/I/410f-bUBR3L.jpg',
    id: 2
}]

const cart = {
    products: [{
        id: 1,
        title: 'Book 1',
        price: 4.99,
        description: 'This Description is absolutely amazing',
        imgUrl: 'https://m.media-amazon.com/images/I/410f-bUBR3L.jpg',
        qty: 2
    }, {
        id: 2, title: 'Book 2', price: 9.99, description: 'This Description is absolutely amazing',
        imgUrl: 'https://m.media-amazon.com/images/I/410f-bUBR3L.jpg', qty: 4
    }],
    totalPrice: 59.98
}

const getIndex = (req, res, next) => {
    res.render('shop/index', {
        products,
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
        products,
        pageTitle: 'Shop|Products',
        path: '/product-list',
        hasProducts: products.length > 0,
    });
}

const getProduct = (req, res, next) => {
    const {productId} = req.params
    res.render('shop/product-detail', {
        product: products[productId],
        pageTitle: 'Shop|Product',
        path: '/product-list',
    })
}

const getCart = (req, res, next) => {
    res.render('shop/cart', {
        products,
        pageTitle: 'Shop|Cart',
        path: '/cart',
        cartItems: cart.products,
        cartTotal: cart.totalPrice,
    })
}

const postCart = (req, res, next) => {
    const {productId} = req.body;
    console.log(productId)
    res.redirect('/cart')
}

const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Shop|Checkout',
        path: '/checkout'
    })
}

module.exports = {getProducts, getIndex, getCart, getCheckout, getOrders, getProduct, postCart}