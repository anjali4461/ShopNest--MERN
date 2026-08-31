const express = require('express')
const {protect} = require('../middlewares/authMiddleware')
const {admin} = require('../middlewares/adminMiddleware')
const {getProductById, getProducts, createProduct, deleteProduct, updateProduct} = require('../controllers/productController')
const multer = require('multer')
const upload = multer({
    dest: 'uploads/'
})

const router = express.Router()

// all products
router.route('/').get(getProducts).post(protect,admin,upload.single('image'),createProduct)
// specific product
router.route('/:id').get(getProductById).put(protect,admin,upload.single('image'),updateProduct).delete(protect,admin,deleteProduct)

module.exports = router

// C - GET
// R - POST
// U - UPDATE
// D - DELETE