const express = require('express');
const router = express.Router();
const producttype = require('../controller/productTypeController')
const { protect } = require('../middleware/authMiddleware')

router
    .route('/create')
    .post(protect, producttype.createproducttype)

router
    .route('/getall')
    .get(protect, producttype.getallproducttype)

module.exports = router