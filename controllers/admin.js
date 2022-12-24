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
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
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

const getEditProduct = (req, res, next) => {
    const {productId} = req.params
    const editMode = req.query.edit;
    Boolean(editMode)

    if (!editMode) {
        return res.redirect('/')
    }
    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: products[productId]
    })
}

const postEditProduct = (req, res, next) => {
    const {productId, title, description, price, imgUrl} = req.body;
    console.log(req.body)
    //update Product
    res.redirect('/admin/products-list')
}

const deleteProduct = (req, res, next) => {
    const {productId} = req.body;
    console.log(req.body)
    //delete Product
    res.redirect('/admin/products-list')
}

module.exports = {getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct, deleteProduct}