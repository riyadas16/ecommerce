const express = require('express');
const product = require('../model/productModel')
const producttype = require('../model/productTypeModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')



exports.createproduct = catchAsync(async (req, res) => {
    const userid = req.user._id;
    const ans = await producttype.findById({ _id: req.body.producttype });
    // console.log(ans);
    if (ans) {
        const create = await product.create({
            productname: req.body.productname,
            productprice: req.body.productprice,
            size: req.body.size,
            color: req.body.color,
            photo: req.body.photo,
            producttype: req.body.producttype,
            userid: userid
        })
        res.status(200).json({ message: "success", create })
    } else {
        res.status(404).json({ message: 'Product type not found' })
    }
})

exports.updateproduct = catchAsync(async (req, res) => {

    const update = await product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ message: "Updated succesfully", update })
})

exports.deleteproduct = catchAsync(async (req, res,next) => {
const prodid = await product.findById({ _id: req.params.id })

if(!prodid){
   
    return next(new AppError('Product doesnot exists',400))
}
else{

    await product.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Deleted succesfully" })
}})

exports.getallproduct = catchAsync(async (req, res) => {
    const getall = await product.find().populate("producttype")
    res.status(200).json({ message: "success", getall })
})

exports.getproductbyid = catchAsync(async (req, res) => {
    const getbyid = await product.findById(req.params.id)
    res.status(200).json({ message: "success", getbyid })
})

exports.getproductbyproducttype = catchAsync(async (req, res) => {
    const getproductbyprodtype = await product.find({ producttype: req.params.id }).populate("producttype")
    res.status(200).json({ message: "success", getproductbyprodtype })
})

exports.getmostrecentproduct = catchAsync(async (req, res) => {
    const mostrecent = await product.aggregate(
        [
            { $sort: { createdAt: -1 } },
            { $limit: 2 }
        ])
    res.status(200).json({ message: "success", mostrecent })
})
exports.likedproduct = catchAsync(async(req,res)=>{
    const likeprod =await product.aggregate([ {$project :{"_id":1,"liked":1}},{$sort:{liked :-1}},{$limit:2}])
    res.status(200).json({ likeprod })
})
