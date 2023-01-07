const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const sendMail = require('../utils/sendEmail');

const getLogin = asyncHandler(async (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
    })
})

const postLogin = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body

    const user = await User.findOne({where: {email}});

    if (!user) {
        return res.redirect('/signup')
    }
    const checkPasswords = await bcrypt.compare(password, user.password);

    if (checkPasswords) {
        req.session.isLoggedIn = true;
        req.session.user = user
        return res.redirect('/')
    }
})

const getSignUp = asyncHandler(async (req, res, next) => {
    res.render('auth/signUp', {
        pageTitle: 'Sign Up',
        path: '/signup',
    })
})

const postSignUp = asyncHandler(async (req, res, next) => {
    const {email, password, repeatedPassword} = req.body
    const user = await User.findOne({where: {email}});

    if (!user) {
        let hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hashedPassword
        })

        newUser.createCart({userId: newUser.id})

        let options = {
            email,
            subject: 'Sign Up Successfully',
            text: 'Thank you for Signing In have fun shopping!',
        }
        
        await sendMail(options)
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