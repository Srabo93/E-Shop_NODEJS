const { createPagination } = require("../utils/paginationHelpers");

const paginatedProducts = (model) => async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  req.query.sort !== undefined
    ? (req.session.order = [req.query.sort.split(",")])
    : (req.session.order = req.session.order);

  try {
    const total = await model.count();
    const results = await model.findAll({
      offset: startIndex,
      limit,
      order: req.session.order,
    });
    const pagesTotal = Math.ceil(parseInt(total, 10) / limit);

    const pagination = await createPagination({
      endIndex,
      total,
      page,
      startIndex,
      pagesTotal,
      limit,
    });

    res.paginatedProducts = {
      success: true,
      pagination,
      data: results,
    };
  } catch (error) {
    next(error);
  }
  next();
};

const paginatedUserOrders = (model) => async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  /**
   * TODO Add Sorty By Total Price after Models adjustments
   */
  req.query.sort !== undefined
    ? (req.session.order = [req.query.sort.split(",")])
    : (req.session.order = req.session.order);

  try {
    const total = await req.user.countOrders();
    const results = await req.user.getOrders({
      include: ["products"],
      offset: startIndex,
      limit,
      order: req.session.order,
    });
    const pagesTotal = Math.ceil(parseInt(total, 10) / limit);

    const pagination = await createPagination({
      endIndex,
      total,
      page,
      startIndex,
      pagesTotal,
      limit,
    });

    res.paginatedUserOrders = {
      success: true,
      pagination,
      data: results,
    };
  } catch (error) {
    next(error);
  }
  next();
};

const paginatedAdminProducts = (model) => async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  req.query.sort !== undefined
    ? (req.session.order = [req.query.sort.split(",")])
    : (req.session.order = req.session.order);

  try {
    const total = await req.user.countProducts();
    const results = await req.user.getProducts({
      offset: startIndex,
      limit,
      order: req.session.order,
    });
    const pagesTotal = Math.ceil(parseInt(total, 10) / limit);

    const pagination = await createPagination({
      endIndex,
      total,
      page,
      startIndex,
      pagesTotal,
      limit,
    });

    res.paginatedProducts = {
      success: true,
      pagination,
      data: results,
    };
  } catch (error) {
    next(error);
  }
  next();
};

module.exports = {
  paginatedProducts,
  paginatedUserOrders,
  paginatedAdminProducts,
};
