const Tokens = require("csrf");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

let tokens = new Tokens({ saltLength: 62, secretLength: 18 });

const isAuthenticated = asyncHandler(async (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }

  next();
});

const authenticationHandler = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    res.locals.isAuthenticated = false;
    return next();
  }

  req.user = await User.findByPk(req.session.user.id);
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

const csurfTokenHandler = asyncHandler(async (req, res, next) => {
  if (req.method === "POST") {
    if (!tokens.verify(process.env.TOKEN_SECRET, req.body.csrfToken)) {
      throw new Error("invalid token!");
    }
  }

  if (req.session.csrfToken === undefined) {
    req.session.csrfToken = tokens.create(process.env.TOKEN_SECRET);
  }
  next();
});

module.exports = {
  isAuthenticated,
  authenticationHandler,
  csurfTokenHandler,
};
