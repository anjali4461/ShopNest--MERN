const Product = require('../models/Product')
const cloudinary = require('../config/cloudinary')

const getProducts = async (req,res) => {
    try{
        const products = await Product.find({}).sort({ createdAt: -1 })
        res.json(products)
    }
    catch(err){
        res.status(500).json({
            message: 'Server error'
        })
    }
}

const getProductById = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(product){
            res.json(product)
        }
        else{
            res.status(404).json({
                message: 'Product not found'
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: 'Server error'
        })
    }
}

const createProduct = async (req,res) => {
    try{
        const {name,description,price,category,stock} = req.body
        let imageUrl = ''

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path)
            imageUrl = result.secure_url
        }
        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        })
        const savedProduct = await product.save()
        res.status(201).json({
            savedProduct
        })
    }
    catch(err){
        res.status(500).json({
            message: 'Server error'
        })
    }
}

const updateProduct = async (req,res) => {
    try{
        const {name,description,price,category,stock} = req.body
        console.log('Update request for ID:', req.params.id)
        console.log('Update data:', {name,description,price,category,stock})
        
        const product = await Product.findById(req.params.id)
        if(product){
            if(name) product.name = name
            if(description) product.description = description
            if(price) product.price = price
            if(category) product.category = category
            if(stock !== undefined) product.stock = stock
            
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path)
                product.imageUrl = result.secure_url
            }
            
            const updatedProduct = await product.save()
            console.log('Product updated:', updatedProduct)
            res.json(updatedProduct)
        }
        else{
            res.status(404).json({
                message: 'Product not found'
            })
        }
    }
    catch(err){
        console.error('Update error:', err)
        res.status(500).json({
            message: 'Server error',
            error: err.message
        })
    }
}

const deleteProduct = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id)

        if(product){
            await product.deleteOne()
            res.json({
                message: 'Product removed'
            })
        }
        else{
            res.status(404).json({
                message: 'Product not found'
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: 'Server error'
        })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}