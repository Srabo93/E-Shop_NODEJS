const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const path = require("path");
const { createInvoice } = require("../utils/createInvoicePDF");

const getIndex = asyncHandler(async (req, res, next) => {
  try {
    const products = res.paginatedProducts.data;
    const pagination = res.paginatedProducts.pagination;
    res.render("shop/index", {
      products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      csrfToken: req.session.csrfToken,
      pagination,
    });
  } catch (error) {
    next(error);
  }
});

const getOrders = asyncHandler(async (req, res, next) => {
  try {
    const orders = res.paginatedUserOrders.data;
    const pagination = res.paginatedUserOrders.pagination;

    await orders.forEach((order) => {
      order.dataValues.orderTotal = 0;
      order.products.forEach((product) => {
        let currentTotal = Number(
          product.dataValues.orderItem.quantity * product.price
        );
        order.dataValues.orderTotal =
          order.dataValues.orderTotal + currentTotal;
      });
    });

    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Shop|My Orders",
      orders,
      csrfToken: req.session.csrfToken,
      pagination,
    });
  } catch (error) {
    next(error);
  }
});

const postOrder = asyncHandler(async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder();

    await order.addProducts(
      products.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );

    await cart.setProducts(null);
    res.redirect("/orders");
  } catch (error) {
    next(error);
  }
});

const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = res.paginatedProducts.data;
    const pagination = res.paginatedProducts.pagination;

    res.render("shop/products-list", {
      products,
      pageTitle: "Shop|Products",
      path: "/product-list",
      pagination,
      hasProducts: products.length > 0,
      csrfToken: req.session.csrfToken,
    });
  } catch (error) {
    next(error);
  }
});

const getProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId);
    res.render("shop/product-detail", {
      product,
      pageTitle: "Shop|Product",
      path: "/product-list",
      csrfToken: req.session.csrfToken,
    });
  } catch (error) {
    next(error);
  }
});

const getCart = asyncHandler(async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    let cartTotal = 0;

    await products.forEach((product) => {
      let currentTotal = product.dataValues.cartItem.quantity * product.price;
      cartTotal += currentTotal;
    });

    res.render("shop/cart", {
      pageTitle: "Shop|Cart",
      path: "/cart",
      cartItems: products,
      cartTotal,
      csrfToken: req.session.csrfToken,
    });
  } catch (error) {
    next(error);
  }
});

const postCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;
  try {
    let cart = await req.user.getCart();
    let cartProducts = await cart.getProducts({ where: { id: productId } });

    let product;
    let newQuantity = 1;

    if (cartProducts.length > 0) {
      product = cartProducts[0];
    }

    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      await cart.addProduct(product, { through: { quantity: newQuantity } });
      res.redirect("/cart");
      return;
    }

    const newProduct = await Product.findByPk(productId);
    await cart.addProduct(newProduct, { through: { quantity: newQuantity } });

    res.redirect("/cart");
  } catch (error) {
    next(error);
  }
});

const postDeleteCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;
  try {
    const cart = await req.user.getCart();
    const product = await cart.getProducts({ where: { id: productId } });

    await product[0].cartItem.destroy();

    res.redirect("/cart");
  } catch (error) {
    next(error);
  }
});

const getCheckout = asyncHandler(async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    let cartTotal = 0;

    await products.forEach((product) => {
      let currentTotal = product.dataValues.cartItem.quantity * product.price;
      cartTotal += currentTotal;
    });
    res.render("shop/checkout", {
      pageTitle: "Shop|Checkout",
      path: "/checkout",
      cartItems: products,
      cartTotal,
      csrfToken: req.session.csrfToken,
    });
  } catch (error) {
    next(error);
  }
});

const getInvoice = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const invoiceName = `invoice-${orderId}.pdf`;
  const invoicePath = path.join("data", "invoices", invoiceName);
  const hasOrder = await req.user.hasOrder(orderId);

  if (!hasOrder) {
    return next(new Error("Order not found"));
  }

  try {
    const order = await req.user.getOrders({
      where: { id: orderId },
      include: ["products"],
    });

    createInvoice(order, invoicePath, res);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart,
  postDeleteCartItem,
  postOrder,
  getInvoice,
};
