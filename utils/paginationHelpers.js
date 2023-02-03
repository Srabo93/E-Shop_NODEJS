const createPagination = async (data) => {
  const { page, endIndex, startIndex, total, pagesTotal, limit } = data;
  const pagination = {};

  pagination.info = { pagesTotal, currentPage: page };

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (pagesTotal === 1) {
    pagination.prev = {
      page: 0,
      limit,
    };
    pagination.next = {
      page: 0,
      limit,
    };
  }

  return pagination;
};

module.exports = { createPagination };
