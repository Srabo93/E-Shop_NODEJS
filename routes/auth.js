const express = require('express');
const {
    postLogin,
    getLogin,
    getLogout,
    getSignUp,
    postSignUp,
    getResetPassword
} = require("../controllers/auth");
const router = express.Router();

router.route('/login').get(getLogin).post(postLogin)
router.route('/logout').get(getLogout)
router.route('/signup').get(getSignUp).post(postSignUp)
router.route('/reset-password').get(getResetPassword)

module.exports = router;