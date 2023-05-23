import express from 'express'
import { authUser,registerUser, logOutUser, getUserProfile, updateUserProfile } from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/auth', authUser)

router.post('/register', registerUser)

router.post('/logout', logOutUser)

router.get('/profile', protect,  getUserProfile)

router.put('/profile',protect, updateUserProfile)

export default router