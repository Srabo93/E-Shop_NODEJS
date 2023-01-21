const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct,
} = require("../controllers/admin");
const { productRules, validate } = require("../middlewares/validations");

router
  .route("/add-product")
  .get(isAuthenticated, getAddProduct)
  .post(isAuthenticated, productRules, validate, postAddProduct);
router.route("/edit-product/:productId").get(isAuthenticated, getEditProduct);
router
  .route("/edit-product")
  .post(isAuthenticated, productRules, validate, postEditProduct);
router.route("/delete-product").post(isAuthenticated, deleteProduct);
router.route("/products-list").get(isAuthenticated, getProducts);

module.exports = router;
