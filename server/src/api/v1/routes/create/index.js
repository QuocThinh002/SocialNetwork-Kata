


const express = require('express')
const router = express.Router()

const createController = require('../../controllers/create.controller')

router.post('/users-random', createController.usersRandom)
router.post('/user', createController.one)
router.post('/friends-random', createController.friendsRandom)




module.exports = router