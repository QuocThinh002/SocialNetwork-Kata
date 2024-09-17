
const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Conversation'
const COLLECTION_NAME = 'Conversations'

const conversationSchema = new Schema({
    avatar: String,
    name: { type: String, trim: true },
    isGroup: { type: Boolean, default: false },
    background: String,
    lastMessage: {
        content: String,
        senderId: { type: Schema.ObjectId, ref: 'User' }
    },
    pinnedMessage: { type: Schema.ObjectId, ref: 'Message' },
    members: [{ userId: { type: Schema.ObjectId, ref: 'User' }, role: { type: String, enum: ['supperAdmin', 'admin', 'user'], default: 'user' } }],
    deleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, conversationSchema)

