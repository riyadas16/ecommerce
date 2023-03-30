const express = require('express');
const catchAsync = require('../utils/catchAsync')
const producttype = require('../model/productTypeModel');
const AppError = require('../utils/appError');


exports.createproducttype = catchAsync(async (req, res) => {
    
    const userid = req.user._id
    console.log(userid)

    const create = await producttype.create(
        {
            productTypeName: req.body.productTypeName,
            userid: userid
        }
    )
    res.status(200).json({ create })

})

exports.getallproducttype = catchAsync(async (req, res) => {
const getalltype=await producttype.find()
res.status(200).json({ getalltype })

})