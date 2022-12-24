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
const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}

const getProducts = (req, res, next) => {
    res.render('admin/products-list', {
        products,
        hasProducts: products.length > 0,
        pageTitle: 'Products List',
        path: '/admin/products-list',
    })
}

const postAddProduct = (req, res, next) => {
    const {title, description, price, imgUrl} = req.body;
    console.log(req.body)
    res.redirect('/')
}


module.exports = {getAddProduct, postAddProduct, getProducts}