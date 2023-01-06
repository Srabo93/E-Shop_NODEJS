const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const getLogin = asyncHandler(async (req, res, next) => {

    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.isLoggedIn
    })
})

const postLogin = asyncHandler(async (req, res, next) => {
    req.session.isLoggedIn = true;
    req.session.user = await User.findByPk(1)
    res.redirect('/')
})

const getSignUp = asyncHandler(async (req, res, next) => {
    res.render('auth/signUp', {
        pageTitle: 'Sign Up',
        path: '/signup',
        isAuthenticated: req.isLoggedIn
    })
})

const postSignUp = asyncHandler(async (req, res, next) => {
    const {email, password, repeatedPassword} = req.body

    const user = await User.findOne({where: {email}});
    if (!user) {
        let hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
            email,
            password: hashedPassword
        })
        return res.redirect('/login')
    }

    return res.redirect('/signup')
})


const getLogout = asyncHandler(async (req, res, next) => {
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