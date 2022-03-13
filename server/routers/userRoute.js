const express = require('express')

const { registerUser, loginUser, getUsers } = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/').get(protect, getUsers)
router.route('/signup').post(registerUser)
router.route('/signin').post(loginUser)

module.exports = router