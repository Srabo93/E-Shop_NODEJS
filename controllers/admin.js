const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const getAddProduct = asyncHandler(async (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    csrfToken: req.session.csrfToken,
  });
});

const getProducts = asyncHandler(async (req, res, next) => {
  const products = await req.user.getProducts();
  const hasProducts = await req.user.countProducts();

  res.render("admin/products-list", {
    products,
    hasProducts,
    pageTitle: "Products List",
    path: "/admin/products-list",
    csrfToken: req.session.csrfToken,
  });
});

const postAddProduct = asyncHandler(async (req, res, next) => {
  const { title, description, price, imgUrl } = req.body;

  await req.user.createProduct({
    title,
    price,
    image: imgUrl,
    description,
  });
  res.redirect("/");
});

const getEditProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const editMode = req.query.edit;
  Boolean(editMode);

  if (!editMode) {
    return res.redirect("/");
  }
  const product = await Product.findByPk(productId);
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product,
    csrfToken: req.session.csrfToken,
  });
});

const postEditProduct = asyncHandler(async (req, res, next) => {
  const { productId, title, description, price, imgUrl } = req.body;

  const product = await Product.findByPk(productId);

  product.title = title ? title : product.title;
  product.description = description ? description : product.description;
  product.price = price ? price : product.price;
  product.image = imgUrl ? imgUrl : product.image;
  await product.save();

  res.redirect("/admin/products-list");
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  await req.user.removeProduct(productId);

  res.redirect("/admin/products-list");
});

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct,
};
