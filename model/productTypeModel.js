const mongoose=require('mongoose')

const producttypeSchema=new mongoose.Schema({
    productTypeName:{
        type:"string",
        unique:[true,"this productname already exists"],
        required:[true,"enter Product type name "]
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"userid",
        required:true    
    }
},{timestamps: true})

const producttype=mongoose.model('ProductType',producttypeSchema)
module.exports=producttype