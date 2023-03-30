const user = require('../model/userModel')
const AppError = require('../utils/appError')
const jwt = require('jsonwebtoken')

const signtoken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}
exports.signup = async (req, res, next) => {


    const userexists = await user.findOne({
        email: req.body.email
    })

    if (userexists) {
        return next(new AppError("user already exists", 404))
    }



    else {

        const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (exp.test(req.body.email)) {
            const newuser = await user.create({
                name: req.body.name,
                email: req.body.email,
                photo: req.body.photo,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword

            })
            res.status(200).json({ newuser })
        }
        else {
            return next(new AppError("email is in valid", 404))
        }
    }
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new AppError("please enter a valid email and password", 403))
    }
    const loginuser = await user.findOne({ email }).select('+password')


    if (!loginuser || !(await loginuser.correctPassword(password, loginuser.password))) {
        return next(new AppError("Incorrect email or password", 403))
    }

    // console.log(user._id)
    const token = signtoken(loginuser._id)
    res.status(201).json({ token })

}
