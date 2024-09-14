
const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Conversation'
const COLLECTION_NAME = 'Conversations'

const conversationSchema = new Schema({
    name: { type: String, trim: true },
    isGroup: { type: Boolean, default: false },
    background: String,
    lastMessage: { // last message in this conversation
        content: {type: Schema.ObjectId, ref: 'Message'}, 
        lastMessageTime: {type: Date}
    },
    pinnedMessage: { type: Schema.ObjectId, ref: 'Message' },
    members: [{userId: { type: Schema.ObjectId, ref: 'User' }, role: {type: String, enum: ['supperAdmin', 'admin', 'user'], default: 'user'}}],
}, {
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, conversationSchema)

