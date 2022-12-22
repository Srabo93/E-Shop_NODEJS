const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}

const getProducts = (req, res, next) => {
    res.render('admin/products-list', {
        pageTitle: 'Products List',
        path: '/admin/products-list'
    })
}

const postAddProduct = (req, res, next) => {
    const {title} = req.body;
    products.push(title)
    console.log(title)
    res.redirect('/')
}


module.exports = {getAddProduct, postAddProduct, getProducts}