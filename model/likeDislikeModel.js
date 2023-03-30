const mongoose=require('mongoose');


const likedislikeschema= new mongoose.Schema({
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    productid:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:[true,"Please enter a valid productId"]
    },
    like:{
        type:Boolean
    },
    dislike:{
        type:Boolean
    }
})

const likedislike=mongoose.model('LikeDislike',likedislikeschema)

module.exports=likedislike