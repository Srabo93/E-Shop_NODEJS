const asyncHandler = require('express-async-handler')
const Tokens = require("csrf");

const isAuthenticated = asyncHandler(async (req, res, next) => {
    let tokens = new Tokens({saltLength: 62, secretLength: 18});
    let secret = await tokens.secret()

    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }

    req.session.csrfToken = tokens.create(secret)

    if (!tokens.verify(secret, req.session.csrfToken)) {
        throw new Error('invalid token!')
    }
    next();
})


module.exports = {
    isAuthenticated,
}