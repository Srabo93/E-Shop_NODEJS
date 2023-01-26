const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const {
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
} = require("../controllers/shop");

router.route("/").get(getIndex);

router.route("/products").get(getProducts);
router.route("/products/:productId").get(getProduct);
router
  .route("/cart")
  .get(isAuthenticated, getCart)
  .post(isAuthenticated, postCart);
router.route("/cart-delete-item").post(isAuthenticated, postDeleteCartItem);
router.route("/checkout").get(isAuthenticated, getCheckout);
router.route("/orders").get(isAuthenticated, getOrders);
router.route("/orders/:orderId").get(isAuthenticated, getInvoice);
router.route("/create-order").post(isAuthenticated, postOrder);

module.exports = router;
