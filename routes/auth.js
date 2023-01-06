const express = require('express');
const {postLogin, getLogin, getLogout} = require("../controllers/auth");
const router = express.Router();

router.route('/login').get(getLogin).post(postLogin)
router.route('/logout').get(getLogout)

module.exports = router;