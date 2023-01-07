const asyncHandler = require('express-async-handler')

const isAuthenticated = asyncHandler(async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    next();
})

module.exports = {
    isAuthenticated
}