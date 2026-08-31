const express = require('express')
const {protect} = require('../middlewares/authMiddleware')
const {admin} = require('../middlewares/adminMiddleware')
const {getAdminStats} = require('../controllers/analyticsController')

const router = express.Router()

router.get("/",protect,admin,getAdminStats)

module.exports = getAdminStats

