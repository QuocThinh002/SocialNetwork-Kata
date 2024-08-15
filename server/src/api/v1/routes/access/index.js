
const express = require('express')
const router = express.Router()

const accessController = require('../../controllers/access.controler')

router.post('/kata/signup', accessController.signUp)
router.post('/kata/signin', accessController.signIn)



module.exports = router