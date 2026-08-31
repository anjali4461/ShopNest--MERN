const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully!')
    }
    catch(err){
        console.log('MongoDB connection failed:',err.message)
        process.exit(1)
    }
}

module.exports = connectDB