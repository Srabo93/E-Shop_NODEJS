const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/sendEmail");
const crypto = require("crypto");
const { Op } = require("sequelize");

const getLogin = asyncHandler(async (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    csrfToken: req.session.csrfToken,
    errors: false,
    invalidInput: {
      email: "",
      password: "",
    },
  });
});

const postLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    const checkPasswords = await bcrypt.compare(password, user.password);

    if (checkPasswords) {
      req.session.isLoggedIn = true;
      req.session.user = { email: user.email, id: user.id };
      req.session.save((err) => {
        if (err) return next(err);

        res.redirect("/");
      });
    }
  } catch (error) {
    next(error);
  }
});

const getSignUp = asyncHandler(async (req, res, next) => {
  res.render("auth/signUp", {
    pageTitle: "Sign Up",
    path: "/signup",
    csrfToken: req.session.csrfToken,
    errors: false,
    invalidInput: {
      email: "",
      password: "",
      repeatedPassword: "",
    },
  });
});

const postSignUp = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
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
  } catch (error) {
    next(error);
  }
  return res.redirect("/signup");
});

const getLogout = asyncHandler(async (req, res, next) => {
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

const postResetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.redirect("/reset");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    let options = {
      email,
      subject: "Reset Password",
      html: `<p>You requested a password reset, click following link to set a new password, this link is only be available for 1 hour:</p><a href="http://localhost:8000/reset-password/${token}">Set New Password</a>`,
    };
    sendMail(options);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

const getNewPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  let currentTimeStamp = Date.now();
  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: { [Op.gt]: currentTimeStamp },
      },
    });

    if (!user) {
      res.redirect("/");
      return;
    }

    res.render("auth/new-password", {
      pageTitle: "Set New Password",
      path: "/new-password",
      csrfToken: req.session.csrfToken,
      newPasswordToken: token,
      userId: user.id,
    });
  } catch (error) {
    next(error);
  }
});

const postNewPassword = asyncHandler(async (req, res, next) => {
  const { userId, newPassword, newPasswordToken } = req.body;

  let currentTimeStamp = Date.now();
  try {
    const user = await User.findOne({
      where: {
        id: userId,
        resetToken: newPasswordToken,
        resetTokenExpiration: { [Op.gt]: currentTimeStamp },
      },
    });

    if (!user) {
      return res.redirect("/");
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetToken = null;
    user.resetTokenExpiration = null;

    await user.save();
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getLogin,
  postLogin,
  getLogout,
  getSignUp,
  postSignUp,
  getResetPassword,
  postResetPassword,
  getNewPassword,
  postNewPassword,
};
