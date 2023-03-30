const express=require('express');
const router=express.Router();
const likedislikeController=require('../controller/likeDislikeController')
const {protect} = require('../middleware/authmiddleware')



router
.route('/like')
.post(protect,likedislikeController.like)

router
.route('/dislike')
.post(protect, likedislikeController.dislike)


module.exports=router