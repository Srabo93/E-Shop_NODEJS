const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const { deleteFile } = require("../utils/fileHelper");

const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await req.user.getProducts();
    const hasProducts = await req.user.countProducts();

    res.render("admin/products-list", {
      products,
      hasProducts,
      pageTitle: "Products List",
      path: "/admin/products-list",
      csrfToken: req.session.csrfToken,
    });
  } catch (error) {
    next(error);
  }
});

const getAddProduct = asyncHandler(async (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    csrfToken: req.session.csrfToken,
    errors: false,
    product: "",
  });
});

const postAddProduct = asyncHandler(async (req, res, next) => {
  const { title, description, price } = req.body;

  try {
    await req.user.createProduct({
      title,
      price,
      image: req.file.path,
      description,
    });
    res.redirect("/admin/products-list");
  } catch (error) {
    next(error);
  }
});

const getEditProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const editMode = req.query.edit;
  Boolean(editMode);

  if (!editMode) {
    return res.redirect("/");
  }
  try {
    const product = await Product.findByPk(productId);
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
      errors: false,
      csrfToken: req.session.csrfToken,
    });
  } catch (error) {
    next(error);
  }
});

const postEditProduct = asyncHandler(async (req, res, next) => {
  const { productId, title, description, price } = req.body;
  try {
    const product = await Product.findByPk(productId);

    if (product.userId !== req.user.id) {
      return res.redirect("/");
    }

    product.title = title ? title : product.title;
    product.description = description ? description : product.description;
    product.price = price ? price : product.price;
    if (req.file) {
      deleteFile(product.image);
      product.image = req.file.path;
    }

    await product.save();

    res.redirect("/admin/products-list");
  } catch (error) {
    next(error);
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  try {
    const [product] = await req.user.getProducts({
      where: { id: productId },
    });

    deleteFile(product.image);
    await req.user.removeProduct(productId);

    res.redirect("/admin/products-list");
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct,
};
