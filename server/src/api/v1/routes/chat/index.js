
const express = require('express')
const router = express.Router()

const ChatController = require('../../controllers/chat.controller')

router.get('/conversation/:conversationId', ChatController.getConversation)
router.post('/get-create-conv/:orderUserId', ChatController.getCreateConversation)



module.exports = router