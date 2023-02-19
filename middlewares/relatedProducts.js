const Product = require("../models/Product");
const Product_Category = require("../models/Product_Category");

const relatedProducts = async (req, res, next) => {
  const product = await Product.findByPk(req.params.productId);
  const relatedProducts = await Product_Category.findAll({
    where: { id: product.productCategoryId },
    include: [{ model: Product }],
    limit: 6,
  });
  res.relatedProducts = relatedProducts;
  next();
};

module.exports = { relatedProducts };
