const mongoose=require('mongoose');

const productSchema = new mongoose.Schema({

    productname:{
        type:String,
        required:[true,"Please enter a Product name"],
    },
    productprice: {
        type:Number,
        required:[true,"Please enter a Product price"]
    },
    size: {
        type:String,
       enum:['M','XL','XXL','Free','L'],
       required:[true,"Please enter a Product size from 'M','XL','XXL','Free','L'"]
        
    },
    color: {
        type:String
    },
    photo:{
        type:String
    },
    producttype:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ProductType",            
        required:true

    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true    
    },
    liked: {
        type: Number,
        default: 0
    },
    disliked: {
        type: Number,
        default: 0
    }

},{timestamps: true})
const product=mongoose.model('Product',productSchema)

module.exports=product