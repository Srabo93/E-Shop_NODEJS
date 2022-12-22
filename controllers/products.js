const getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}

const postAddProduct = (req, res, next) => {
    const {title} = req.body;
    products.push(title)
    console.log(title)
    res.redirect('/')
}


const getProducts = (req, res, next) => {
    const products = ['Book1']
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
}

module.exports = {getAddProduct, postAddProduct, getProducts}