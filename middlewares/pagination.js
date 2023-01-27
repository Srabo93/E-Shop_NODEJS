const advancedResults = (model) => async (req, res, next) => {
  const total = await model.count();
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = await model.findAll({ offset: startIndex, limit });
  const pagesTotal = Math.ceil(
    parseInt(total, 10) / parseInt(results.length, 10)
  );

  const pagination = {};

  pagination.info = { pagesTotal };

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    pagination,
    data: results,
  };
  //todo implement current page key pair, work on the view
  next();
};

module.exports = { advancedResults };
