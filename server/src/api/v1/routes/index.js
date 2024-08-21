
const express = require('express')
const router = express.Router()

const domain = '/api/v1';


router.use(domain + '/kata', require('./auth'))
router.use(domain + '/user', require('./user'))

module.exports = router