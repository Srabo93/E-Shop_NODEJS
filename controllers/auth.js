const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const getLogin = asyncHandler(async (req, res, next) => {

    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.isLoggedIn
    })
})

const postLogin = asyncHandler((req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/')
})

const getSignUp = asyncHandler((req, res, next) => {
    res.render('auth/signUp', {
        pageTitle: 'Sign Up',
        path: '/signup',
        isAuthenticated: req.isLoggedIn
    })
})

const postSignUp = asyncHandler((req, res, next) => {
    const {email, password, repeatedPassword} = req.body

    const user = User.findOne({where: {email}});

    if (!user) {
        console.log('no user found');
        const newUser = new User({
            email,
            password,
        })
    }

    return res.redirect('/login')

})


const getLogout = asyncHandler((req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/')
    });
})

module.exports = {
    getLogin,
    postLogin,
    getLogout,
    getSignUp,
    postSignUp
}