const User = require('../models/User')
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

const generateOTP = () => {
    return Math.floor(100000 + Math.random()*900000).toString()
}

// Register a user and send OTP
const registerUser = async (req,res) => {
    const {name,email,password} = req.body
    try{
        if(!name || !email || !password){
            return res.status(400).json({
                message: 'Name, email and password are required'
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser && existingUser.verified){
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const otp = generateOTP()
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000)

        if(existingUser){
            existingUser.name = name
            existingUser.password = await bcrypt.hash(password, 10)
            existingUser.otpCode = otp
            existingUser.otpExpires = otpExpires
            existingUser.verified = false
            await existingUser.save()

            const message = `Welcome to ShopNest, ${name}! Your verification OTP is ${otp}. It is valid for 10 minutes.`
            await sendEmail(email, 'ShopNest OTP Verification', message)

            return res.status(200).json({
                message: 'OTP sent to your email. Please verify to complete registration.'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            otpCode: otp,
            otpExpires,
            verified: false
        })

        const message = `Welcome to ShopNest, ${name}! Your verification OTP is ${otp}. It is valid for 10 minutes.`
        await sendEmail(email, 'ShopNest OTP Verification', message)

        return res.status(201).json({
            message: 'OTP sent to your email. Please verify to complete registration.',
            email: user.email
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const verifyOTP = async (req,res) => {
    const {email, otp} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if(user.verified){
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                token: generateToken(user._id)
            })
        }

        if(!user.otpCode || !user.otpExpires){
            return res.status(400).json({
                message: 'OTP not generated. Please register again.'
            })
        }

        if(Date.now() > new Date(user.otpExpires).getTime()){
            user.otpCode = ''
            user.otpExpires = null
            await user.save()
            return res.status(400).json({
                message: 'OTP expired. Please register again.'
            })
        }

        if(user.otpCode !== otp){
            return res.status(400).json({
                message: 'Invalid OTP'
            })
        }

        user.verified = true
        user.otpCode = ''
        user.otpExpires = null
        await user.save()

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            token: generateToken(user._id)
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Login a user
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
        console.log('Login attempt with email:', email)
        const user = await User.findOne({email})
        console.log('User found:', user ? 'yes' : 'no')
        
        if(user && (await bcrypt.compare(password,user.password))){
            const isLegacyVerifiedUser = !user.verified && !user.otpCode && !user.otpExpires

            if(user.verified || isLegacyVerifiedUser){
                if(isLegacyVerifiedUser){
                    user.verified = true
                    user.otpCode = ''
                    user.otpExpires = null
                    await user.save()
                }
                const token = generateToken(user._id)
                console.log('Login successful for:', email)
                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                    token
                })
            }

            return res.status(403).json({
                message: 'This account is not verified yet. Please complete the OTP verification step during registration.'
            })
        }
        else{
            console.log('Invalid credentials for email:', email)
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }
    }
    catch(err){
        console.error('Login error:', err)
        res.status(500).json({
            message: 'Server error',
            error: err.message
        })
    }
} 

// get users
const getUsers = async (req,res) => {
    try{
        const users = await User.find({}).select('-password')
        res.json(users)
    }
    catch(err){
        res.status(500).json({
            message : 'Server error'
        })
    }
}

module.exports = {
    registerUser,
    verifyOTP,
    loginUser,
    getUsers
}