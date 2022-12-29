const Product = require('../models/Product')

const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

const getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('admin/products-list', {
            products,
            hasProducts: products.length > 0,
            pageTitle: 'Products List',
            path: '/admin/products-list',
        })
    }).catch(error => console.log(error))
}

const postAddProduct = (req, res, next) => {
    const {title, description, price, imgUrl} = req.body;
    Product.create({
        title,
        price,
        image: imgUrl,
        description,
    }).then(() => console.log('Created Product')).catch(error => console.log(error))
    res.redirect('/')
}

const getEditProduct = (req, res, next) => {
    const {productId} = req.params
    const editMode = req.query.edit;
    Boolean(editMode)

    if (!editMode) {
        return res.redirect('/')
    }
    Product.findByPk(productId).then(product => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product
        })
    }).catch(error => console.log(error))
}

const postEditProduct = (req, res, next) => {
    const {productId, title, description, price, imgUrl} = req.body;

    const updatedProduct = Product.findByPk(productId).then(product => {
        product.title = title ? title : product.title
        product.description = description ? description : product.description
        product.price = price ? price : product.price
        product.image = imgUrl ? imgUrl : product.image
        return product.save()
    }).catch(error => console.log(error))

    //update Product
    res.redirect('/admin/products-list')
}

const deleteProduct = (req, res, next) => {
    const {productId} = req.body;

    Product.findByPk(productId).then(product => {
        return product.destroy();
    }).then(() => {
        res.redirect('/admin/products-list')
    }).catch(error => console.log(error))
}

module.exports = {getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct, deleteProduct}