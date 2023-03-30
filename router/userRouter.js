const express=require('express')
const router= express.Router()
const userController=require('../controller/userController')


router.route('/login').post(userController.signin)
router.route('/register').post(userController.signup)

module.exports=router