const express = require('express');
const router = express.Router();
const productController = require('../controller/productController')
const { protect } = require('../middleware/authMiddleware')


router.route('/create').post(protect, productController.createproduct)
router.route('/update/:id').patch(protect, productController.updateproduct)
router.route('/delete/:id').delete(protect, productController.deleteproduct)
router.route('/getall').get(protect, productController.getallproduct)
router.route('/getbyid/:id').get(protect, productController.getproductbyid)
router.route('/getprodbyprodtype/:id').get(protect, productController.getproductbyproducttype)
router.route('/mostrecent').get(protect, productController.getmostrecentproduct)
router.route('/likedproduct').get(protect, productController.likedproduct)
module.exports = router