const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/authRoutes')
const dns = require("dns")
dns.setServers(["1.1.1.1"])
dotenv.config()
connectDB()

const app = express()
app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL].filter(Boolean),
        credentials: true
    }
))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send('Shopnest is working properly!')
    console.log('Shopnest backend is working properly!')
})

// Routes
app.use('/api/auth',userRoutes)
app.use('/api/products',require('./routes/productRoutes'))
app.use('/api/orders',require('./routes/orderRoutes'))
app.use('/api/payment',require('./routes/paymentRoutes'))
app.use('/api/analytics',require('./routes/analyticsRoutes'))

// Serve frontend in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build/index.html')))

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    })
}
else{
    app.get('/',(req,res) => {
        res.send('ShopNest API is running in Development mode...')
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})