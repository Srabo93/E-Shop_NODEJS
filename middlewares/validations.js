const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const userSignUpRules = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email")
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  body("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name must be at least 2 characters"),
  body("lastName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last Name must be at least 2 characters"),
  body(
    "password",
    "Password must be in range of 5 to 18 characters and must contain at least one digit"
  )
    .trim()
    .isLength({ min: 5, max: 18 })
    .matches(/\d/),
  body("repeatedPassword", "Passwords do not match")
    .trim()
    .isLength({ min: 5, max: 18 })
    .matches(/\d/)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
];

const userLoginRules = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email or Password is not valid")
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (!user) {
          res.redirect("/signup");
          return Promise.reject("Not such Email is registered");
        }
      });
    }),
  body("password", "Email or Password is not valid")
    .trim()
    .isLength({ min: 5, max: 18 }),
];

const productRules = [
  body("title")
    .ltrim()
    .rtrim()
    .isAlphanumeric("en-US", { ignore: " -" })
    .withMessage("Invalid Value, Title can contain Alphanumeric characters")
    .isLength({ min: 3, max: 250 }),
  body("price").isFloat().withMessage("Number must be of type Float"),
  body("description")
    .trim()
    .isLength({ min: 1, max: 400 })
    .withMessage("Description must be min Lenght 1 and Max Length 400"),
  body("categoryOptions").isLength({ min: 1 }).withMessage("Category required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  switch (req.originalUrl) {
    case "/signup":
      return res.status(422).render("auth/signUp", {
        pageTitle: "Sign Up",
        path: req.originalUrl,
        csrfToken: req.session.csrfToken,
        errors: errors.array()[0].msg,
        invalidInput: {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
          repeatedPassword: req.body.repeatedPassword,
        },
      });
      break;
    case "/login":
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        path: req.originalUrl,
        csrfToken: req.session.csrfToken,
        errors: errors.array().msg,
        invalidInput: {
          email: req.body.email,
          password: req.body.password,
        },
      });
      break;
    case "/admin/add-product":
      return res.status(422).render("admin/edit-product", {
        pageTitle: "Add Product",
        path: req.originalUrl,
        csrfToken: req.session.csrfToken,
        errors: errors.array()[0].msg,
        editing: false,
        product: {
          title: req.body.title,
          description: req.body.description,
          imgUrl: req.body.imgUrl,
          price: req.body.price,
        },
      });
      break;
    case "/admin/edit-product":
      return res.status(422).render("admin/edit-product", {
        pageTitle: "Add Product",
        path: req.originalUrl,
        csrfToken: req.session.csrfToken,
        errors: errors.array()[0].msg,
        editing: true,
        product: {
          title: req.body.title,
          description: req.body.description,
          imgUrl: req.body.imgUrl,
          price: req.body.price,
        },
      });
      break;
  }
};

module.exports = {
  userSignUpRules,
  userLoginRules,
  productRules,
  validate,
};
