const likedislike = require('../model/likeDislikeModel')
const product = require('../model/productModel')
const catchAsync = require('../utils/catchAsync')

exports.like = catchAsync(async (req, res) => {

    const userid = req.user._id

    const data = await likedislike.findOne({
        userid: userid,
        productid: req.body.productid,

    })

    const productexists = await product.findById({_id:req.body.productid})
    if (!productexists) return res.status(400).json({ message: 'product does not exist Please Check your product Id' })

    if (data) {
        if (data.like) {
            return res.status(400).json({
                message: "already liked"
            })
        }

        const like = await likedislike.findByIdAndUpdate(data._id, {

            like: true,
            dislike: false
        }, { new: true })

        const newLikecounter = productexists.liked + 1
        const newDislikecounter = productexists.disliked - 1

        await product.findByIdAndUpdate(req.body.productid, { liked: newLikecounter, disliked: newDislikecounter }, { new: true })

        return res.status(201).json({
            message: "liked"
        })
    }

    const like = await likedislike.create({
        userid: userid,
        productid: req.body.productid,
        like: true
    })

    const newLikecounter = productexists.liked + 1
    await product.findByIdAndUpdate(req.body.productid, { liked: newLikecounter }, { new: true })

    return res.status(201).json({
        message: "liked"
    })
})

exports.dislike = catchAsync(async (req, res) => {
    const userid = req.user._id

    const data = await likedislike.findOne({
        userid: userid,
        productid: req.body.productid,

    })

    const productexists = await product.findById(req.body.productid)
    if (!productexists) return res.status(400).json({ message: 'Product does not exist Please Check your product Id' })

    if (data) {
        if (data.dislike) {
            return res.status(400).json({
                message: "already disliked"
            })
        }

        const like = await likedislike.findByIdAndUpdate(data._id, {
            userid: userid,
            productid: req.body.productid,
            like: false,
            dislike: true
        }, { new: true })

        const newLikecounter = productexists.liked - 1
        const newDislikecounter = productexists.disliked + 1

        await product.findByIdAndUpdate(req.body.productid, { liked: newLikecounter, disliked: newDislikecounter }, { new: true })

        return res.status(201).json({
            message: "disliked"
        })
    }

    const like = await likedislike.create({
        userid: userid,
        productid: req.body.productid,
        dislike: true
    })

    const newDislikecounter = productexists.liked + 1
    await product.findByIdAndUpdate(req.body.productid, { disliked: newDislikecounter }, { new: true })

    return res.status(201).json({
        message: "disliked"
    })
})