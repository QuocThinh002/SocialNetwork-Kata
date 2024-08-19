
const express = require('express')
const router = express.Router()

const {verifyAccessToken} = require('../../middleware/verifyToken')
const authController = require('../../controllers/auth.controler')

router.post('/kata/signup', authController.signUp)
router.post('/kata/signin', authController.signIn)
router.post('/kata/signout', authController.signOut)
router.get('/kata/verify-account/:verificationToken', authController.verifyAccount)
router.post('/kata/forgot-password', authController.forgotPassword)
router.post('/kata/reset-password/:token', authController.resetPassword)



module.exports = router