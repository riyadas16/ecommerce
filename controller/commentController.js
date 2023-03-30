const express = require('express');
const comment = require('../model/commentModel');
const product = require('../model/productModel')
const catchAsync = require('../utils/catchAsync');


exports.createcomment = catchAsync(async (req, res) => {
    const userid = req.user._id
    const ans = await product.findById({ _id: req.body.productid });
    if (ans) 
    {
        const create = await comment.create({
            userid: userid,
            comment: req.body.comment,
            productid: req.body.productid
        })
        res.status(200).json({ message: "success", create })
    }
    else 
    {
        res.status(404).json({ message: 'Product not found,Enter valid Productid' })
    }
})

exports.getallcomment=catchAsync(async (req, res)=>{
    const getall = await comment.find().populate('productid').populate('userid');
    res.status(200).json({message:"success",getall})
})

exports.getusercomment=catchAsync(async (req,res)=>{
const userid=req.user._id
    const usercomment=await comment.find({userid}).populate('userid').populate('productid')
    res.status(200).json({usercomment})
})