const { createPagination } = require("../utils/paginationHelpers");

const paginatedProducts = (model) => async (req, res, next) => {
  let page;
  let limit;
  if (req.path === "/") {
    page = parseInt(req.query.page, 10) || 1;
    limit = parseInt(req.query.limit, 10) || 5;
  } else {
    page = parseInt(req.query.page, 10) || 1;
    limit = parseInt(req.query.limit, 10) || 10;
  }

  let startIndex = (page - 1) * limit;
  let endIndex = page * limit;

  const sortable = ["createdAt", "rating", "price"];
  req.query.sort !== undefined &&
  sortable.includes(req.query.sort.split(",")[0])
    ? (req.session.order = [req.query.sort.split(",")])
    : (req.session.order = req.session.order);

  req.query.sort === undefined && req.session.order === undefined
    ? (req.session.order = [["createdAt", "asc"]])
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

  const sortable = ["createdAt", "total"];
  req.query.sort !== undefined &&
  sortable.includes(req.query.sort.split(",")[0])
    ? (req.session.order = [req.query.sort.split(",")])
    : (req.session.order = req.session.order);

  req.query.sort === undefined && req.session.order === undefined
    ? (req.session.order = [["createdAt", "asc"]])
    : (req.session.order = req.session.order);

  try {
    const total = await req.user.countOrders();
    console.log(total);
    if (total === 0) {
      res.paginatedUserOrders = {
        success: false,
        pagination: {},
        data: {},
      };
    } else {
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
    }
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

  req.query.sort === undefined && req.session.order === undefined
    ? (req.session.order = [["createdAt", "asc"]])
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
