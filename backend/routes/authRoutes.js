const express = require('express')
const router = express.Router()
const {registerUser, verifyOTP, loginUser, getUsers} = require('../controllers/authController')
const {protect} = require('../middlewares/authMiddleware')
const {admin} = require('../middlewares/adminMiddleware')

router.post("/register",registerUser)
router.post("/verify-otp",verifyOTP)
router.post("/login",loginUser)
router.get("/users",protect,admin,getUsers)

module.exports = router

