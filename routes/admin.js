const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { paginatedAdminProducts } = require("../middlewares/pagination");
const {
  addProductRules,
  editProductRules,
  validate,
} = require("../middlewares/validations");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct,
} = require("../controllers/admin");
const router = express.Router();

router
  .route("/add-product")
  .get(isAuthenticated, getAddProduct)
  .post(isAuthenticated, addProductRules, validate, postAddProduct);
router.route("/edit-product/:productId").get(isAuthenticated, getEditProduct);
router
  .route("/edit-product")
  .post(isAuthenticated, editProductRules, validate, postEditProduct);
router.route("/delete-product").post(isAuthenticated, deleteProduct);
router
  .route("/products-list")
  .get(isAuthenticated, paginatedAdminProducts(), getProducts);

module.exports = router;
