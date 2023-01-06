const asyncHandler = require('express-async-handler')

const getLogin = asyncHandler(async (req, res, next) => {

    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.isLoggedIn
    })
})

const postLogin = asyncHandler((req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true')
    res.redirect('/')
})

module.exports = {
    getLogin,
    postLogin
}