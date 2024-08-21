
const express = require('express')
const router = express.Router()

const authController = require('../../controllers/auth.controller')

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)
router.post('/signout', authController.signOut)
router.get('/verify-account/:verificationToken', authController.verifyAccount)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password/:token', authController.resetPassword)



module.exports = router