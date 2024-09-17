
const express = require('express')
const router = express.Router()

const ChatController = require('../../controllers/chat.controller')
const {uploadImage} = require('../../configs/cloudinary.config')

router.get('/conversation/:conversationId', ChatController.getConversation)
router.get('/conversations', ChatController.getConversations)
router.post('/get-create-conv/:orderUserId', ChatController.getCreateConversation)
router.post('/createGroup', uploadImage.fields([{ name: 'avatar', maxCount: 1 }]), ChatController.createGroup)


module.exports = router