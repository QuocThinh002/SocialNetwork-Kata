
const express = require('express')
const router = express.Router()

const accessController = require('../../controllers/access.controler')

router.post('/kata/signup', accessController.signUp)


module.exports = router