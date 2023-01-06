const express = require('express');
const {postLogin, getLogin} = require("../controllers/auth");
const router = express.Router();

router.route('/login').get(getLogin).post(postLogin)

module.exports = router;