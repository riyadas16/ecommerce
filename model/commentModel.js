const mongoose = require('mongoose');

const commentSchema=new mongoose.Schema({

    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true    
    },
    comment:{
        type:String,
        required:[true,"Please enter a comment"]
    },
    productid:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:[true,"Please enter a productId"]
    }


})
const comment= mongoose.model('Comment', commentSchema)
module.exports = comment