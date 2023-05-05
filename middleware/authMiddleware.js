const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const user = require('../model/userModel')
const AppError=require('../utils/appError')

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    
    if (!token) {
        return next(new AppError("you must be logged in first!",401))
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    

    
    const currentuser = await user.findById(decoded.id)
    if (!currentuser) {
        return next (new AppError("the user does not exist",403))
    }
    
    req.user = currentuser;
    next()
}
