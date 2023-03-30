const express=require('express');
const router=express.Router();
const commentController=require('../controller/commentController')
const {protect} = require('../middleware/authmiddleware')


router.route('/create').post(protect,commentController.createcomment)
router.route('/getall').get(protect,commentController.getallcomment)
router.route('/getuser').get(protect,commentController.getusercomment)

module.exports=router