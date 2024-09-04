const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Chat'
const COLLECTION_NAME = 'Chats'

const chatSchema = new mongoose.Schema(
    {
        senderId: String,
        conversationId: String,
        content: String,
        images: Array,
        reactIcons: [{
            senderId: { type: mongoose.Schema.ObjectId, ref: 'User' },
            typeIcon: {type: String, enum: ['like', 'haha', 'sad', 'love', 'wow']}
        }],
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

module.exports = mongoose.model(DOCUMENT_NAME, chatSchema)