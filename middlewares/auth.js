const asyncHandler = require('express-async-handler')
const crypto = require('crypto')

const isAuthenticated = asyncHandler(async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    next();
})

const generateCSRFToken = asyncHandler(async (req, res, next) => {
    if (req.session.isLoggedIn) {
        req.session.csrfToken = crypto.randomBytes(48, (err, buf) => buf.toString('hex'))
    }
    next()
})


module.exports = {
    isAuthenticated,
    generateCSRFToken
}