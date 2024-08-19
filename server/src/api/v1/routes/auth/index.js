
const express = require('express')
const router = express.Router()

const authController = require('../../controllers/auth.controler')

router.get('/kata/verify-account/:verificationToken', authController.verifyAccount)
router.post('/kata/signup', authController.signUp)
router.post('/kata/signin', authController.signIn)



module.exports = router