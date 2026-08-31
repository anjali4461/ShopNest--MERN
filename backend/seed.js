const dns = require("dns")
dns.setServers(["1.1.1.1"])
require('dotenv').config()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')

const seedDatabase = async () => {
	try{
		await connectDB()

		const password = await bcrypt.hash('Password123!', 10)
		const admin = await User.findOneAndUpdate(
			{email: 'admin@shopnest.com'},
			{
				name: 'ShopNest Admin',
				email: 'admin@shopnest.com',
				password,
				role: 'admin',
				verified: true
			},
			{upsert: true, returnDocument: 'after', setDefaultsOnInsert: true}
		)
		const customer = await User.findOneAndUpdate(
			{email: 'customer@shopnest.com'},
			{
				name: 'Demo Customer',
				email: 'customer@shopnest.com',
				password,
				role: 'user',
				verified: true
			},
			{upsert: true, returnDocument: 'after', setDefaultsOnInsert: true}
		)

		const productData = [
			{
				name: 'Wireless Headphones',
				description: 'Bluetooth headphones with noise cancellation and a 30-hour battery.',
				price: 4999,
				category: 'Electronics',
				stock: 25,
				imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
				rating: 4.5,
				numReviews: 18
			},
			{
				name: 'Mechanical Keyboard',
				description: 'Compact mechanical keyboard with tactile switches and RGB backlighting.',
				price: 3499,
				category: 'Accessories',
				stock: 40,
				imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
				rating: 4.7,
				numReviews: 24
			},
			{
				name: 'Everyday Backpack',
				description: 'Water-resistant backpack with a padded laptop compartment.',
				price: 2199,
				category: 'Bags',
				stock: 15,
				imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
				rating: 4.3,
				numReviews: 11
			},
			{
				name: 'Smartwatch Pro',
				description: 'Fitness smartwatch with heart rate tracking, GPS, and AMOLED display.',
				price: 6999,
				category: 'Electronics',
				stock: 18,
				imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
				rating: 4.6,
				numReviews: 16
			},
			{
				name: 'Premium Coffee Maker',
				description: 'Compact coffee machine with programmable brew strength and timer.',
				price: 6299,
				category: 'Home',
				stock: 12,
				imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
				rating: 4.8,
				numReviews: 27
			},
			{
				name: 'Classic Leather Wallet',
				description: 'Handcrafted leather wallet with RFID protection and multiple compartments.',
				price: 1899,
				category: 'Fashion',
				stock: 30,
				imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
				rating: 4.4,
				numReviews: 9
			},
			{
				name: 'Portable Bluetooth Speaker',
				description: 'Crisp sound, deep bass, and waterproof design for travel and outdoors.',
				price: 2899,
				category: 'Electronics',
				stock: 22,
				imageUrl: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=80',
				rating: 4.5,
				numReviews: 21
			},
			{
				name: 'Office Chair',
				description: 'Ergonomic chair with lumbar support and adjustable height.',
				price: 7999,
				category: 'Furniture',
				stock: 10,
				imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
				rating: 4.7,
				numReviews: 13
			},
			{
				name: 'Running Shoes',
				description: 'Lightweight running shoes with breathable mesh and cushioned sole.',
				price: 4599,
				category: 'Sports',
				stock: 32,
				imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
				rating: 4.6,
				numReviews: 19
			},
			{
				name: 'Desk Lamp',
				description: 'Minimal LED desk lamp with touch controls and adjustable arm.',
				price: 1599,
				category: 'Home',
				stock: 28,
				imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
				rating: 4.2,
				numReviews: 8
			},
			{
				name: 'Travel Duffle Bag',
				description: 'Spacious duffle bag with waterproof fabric and separate shoe compartment.',
				price: 2499,
				category: 'Bags',
				stock: 17,
				imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
				rating: 4.3,
				numReviews: 15
			},
			{
				name: 'Digital Camera',
				description: 'Compact digital camera with 4K recording and built-in image stabilization.',
				price: 12999,
				category: 'Electronics',
				stock: 9,
				imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
				rating: 4.9,
				numReviews: 31
			}
		]

		const products = []
		for(const data of productData){
			const product = await Product.findOneAndUpdate(
				{name: data.name},
				data,
				{upsert: true, returnDocument: 'after', setDefaultsOnInsert: true}
			)
			products.push(product)
		}

		await Order.findOneAndUpdate(
			{user: customer._id, 'items.productId': products[0]._id},
			{
				user: customer._id,
				items: [{
					productId: products[0]._id,
					qty: 1,
					price: String(products[0].price)
				}],
				totalAmount: products[0].price,
				address: {
					fullName: 'Demo Customer',
					street: '123 Market Street',
					city: 'Mumbai',
					postalCode: '400001',
					country: 'India'
				},
				paymentId: 'demo_payment_123',
				status: 'pending'
			},
			{upsert: true, returnDocument: 'after', setDefaultsOnInsert: true}
		)

		console.log('Seed data created successfully.')
		console.log('Admin: admin@shopnest.com / Password123!')
		console.log('Customer: customer@shopnest.com / Password123!')
	}
	catch(err){
		console.error('Seed failed:', err.message)
		process.exitCode = 1
	}
	finally{
		await mongoose.disconnect()
	}
}

seedDatabase()
