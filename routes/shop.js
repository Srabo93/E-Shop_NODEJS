const Product = require("../models/Product");
const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  paginatedProducts,
  paginatedUserOrders,
} = require("../middlewares/pagination");
const router = express.Router();
const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart: postCartItem,
  postDeleteCartItem,
  postOrder,
  getInvoice,
} = require("../controllers/shop");

router.route("/").get(paginatedProducts(Product), getIndex);
router.route("/products").get(paginatedProducts(Product), getProducts);
router.route("/products/:productId").get(getProduct);
router
  .route("/cart")
  .get(isAuthenticated, getCart)
  .post(isAuthenticated, postCartItem);
router.route("/cart-delete-item").post(isAuthenticated, postDeleteCartItem);
router.route("/checkout").get(isAuthenticated, getCheckout);
router.route("/orders").get(isAuthenticated, paginatedUserOrders(), getOrders);
router.route("/orders/:orderId").get(isAuthenticated, getInvoice);
router.route("/create-order").post(isAuthenticated, postOrder);

module.exports = router;
