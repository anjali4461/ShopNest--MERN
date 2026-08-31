const Order = require('../models/Order')
const Product = require('../models/Product')
const sendEmail = require('../utils/sendEmail')

// Create a new order
const createOrder = async (req,res) => {
    try{
        const {items, totalAmount, address, paymentId} = req.body
        const numericTotalAmount = Number(totalAmount)
        if(!Array.isArray(items) || items.length === 0 || Number.isNaN(numericTotalAmount) || !address){
            return res.status(400).json({
                message: 'Invalid order data'
            })
        }

        for (const item of items) {
            const product = await Product.findById(item.productId)
            if (!product) {
                return res.status(404).json({
                    message: `Product not found for item ${item.productId}`
                })
            }

            const requestedQty = Number(item.qty || 1)
            if (requestedQty > product.stock) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`
                })
            }
        }

        for (const item of items) {
            const product = await Product.findById(item.productId)
            if (product) {
                product.stock = Math.max(0, product.stock - Number(item.qty || 1))
                await product.save()
            }
        }

        const order = new Order({
            user: req.user._id,
            items,
            totalAmount: numericTotalAmount,
            address,
            paymentId
        })
        await order.save()

        const shippingAddress = [
            address.fullName,
            address.street,
            `${address.city}, ${address.postalCode}`,
            address.country
        ].filter(Boolean).join(', ')

        const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully created with the following deatils: \n\nOrder ID: ${order._id}\nTotal Amount: ₹${totalAmount}\nShipping Address: ${shippingAddress}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nShopNest Team`

        await sendEmail(req.user.email, 'Order Created', message)
        res.status(201).json({
            message: 'Order created successfully', order
        })
    }
    catch(err){
        res.status(500).json({
            message: 'Error creating order',err
        })
    }
}

const myOrders = async (req,res) => {
    try{
        const orders = await Order.find({
            user: req.user._id
        }).populate('items.productId','name price')
        res.json(orders)
    }
    catch(err){
        res.status(500).json({
            message: 'Error fetching orders',err
        })
    }
}

const getOrders = async (req,res) => {
    try{
        const orders = await Order.find({}).populate('user', 'name email')
        res.json(orders)
    }
    catch(err){
        res.status(500).json({
            message: 'Error fetching orders',err
        })
    }
}

const updateOrderStatus = async (req,res) => {
    try{
        const {status} = req.body
        const order = await Order.findById(req.params.id).populate('user', 'name email')
        if(order){
            const previousStatus = order.status
            order.status = status
            await order.save()

            if (order.user && order.user.email && (status !== previousStatus)) {
                const statusMessages = {
                    shipped: {
                        subject: 'Your order has been shipped',
                        text: `Dear ${order.user.name},\n\nYour order ${order._id} has been shipped and is on the way.\n\nThank you for shopping with ShopNest.\n\nBest regards,\nShopNest Team`
                    },
                    delivered: {
                        subject: 'Your order has been delivered',
                        text: `Dear ${order.user.name},\n\nYour order ${order._id} has been delivered successfully.\n\nWe hope you enjoy your purchase.\n\nBest regards,\nShopNest Team`
                    }
                }

                const message = statusMessages[status]
                if (message) {
                    await sendEmail(order.user.email, message.subject, message.text)
                }
            }

            res.json({
                message: 'Order status updated',order
            })
        }
        else{
            res.status(404).json({
                message: 'Order not found'
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: 'Error updating order status',err
        })
    }
}



module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus,
}