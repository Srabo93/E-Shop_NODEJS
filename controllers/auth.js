const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/sendEmail");

const getLogin = asyncHandler(async (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    csrfToken: req.session.csrfToken,
  });
});

const postLogin = asyncHandler(async (req, res, next) => {
  //Todo: ask for csrfToken
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.redirect("/signup");
  }
  const checkPasswords = await bcrypt.compare(password, user.password);

  if (checkPasswords) {
    req.session.isLoggedIn = true;
    req.session.user = { email: user.email, id: user.id };
    await req.session.save((err) => {
      if (err) return next(err);

      res.redirect("/");
    });
  }
});

const getSignUp = asyncHandler(async (req, res, next) => {
  res.render("auth/signUp", {
    pageTitle: "Sign Up",
    path: "/signup",
    csrfToken: req.session.csrfToken,
  });
});

const postSignUp = asyncHandler(async (req, res, next) => {
  //Todo: ask for csrfToken

  const { email, password, repeatedPassword } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    let hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    newUser.createCart({ userId: newUser.id });

    let options = {
      email,
      subject: "Sign Up Successfully",
      text: "Thank you for Signing In have fun shopping!",
    };

    res.redirect("/login");
    return sendMail(options);
  }

  return res.redirect("/signup");
});

const getLogout = asyncHandler(async (req, res, next) => {
  //Todo: ask for csrfToken

  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
});

const getResetPassword = asyncHandler(async (req, res, next) => {
  res.render("auth/reset-password", {
    path: "/reset-password",
    pageTitle: "Reset Password",
    csrfToken: req.session.csrfToken,
  });
});

module.exports = {
  getLogin,
  postLogin,
  getLogout,
  getSignUp,
  postSignUp,
  getResetPassword,
};
