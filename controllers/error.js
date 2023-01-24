const send404Page = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not Found", path: "/" });
};

const send500Page = (req, res, next) => {
  res.status(500).render("500", { pageTitle: "Error", path: "/500" });
};

module.exports = { send404Page, send500Page };
