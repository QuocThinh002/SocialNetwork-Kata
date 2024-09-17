
const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyToken.middleware');
const router = express.Router()

const domain = '/api/v1';


router.use(domain + '/create', require('./create'))
router.use(domain + '/kata', require('./auth'))

router.use([verifyAccessToken])
router.use(domain + '/user', require('./user'))
router.use(domain + '/chat', require('./chat'))




module.exports = router