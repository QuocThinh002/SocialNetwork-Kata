
const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Conversation'
const COLLECTION_NAME = 'Conversations'

const conversationSchema = new Schema({
    name: { type: String, trim: true },
    isGroup: { type: Boolean, default: false },
    lastMessage: { // last message in this conversation
        content: {type: Schema.ObjectId, ref: 'Message'}, 
        lastMessageTime: {type: Date}
    },
    pinnedMessage: { type: Schema.ObjectId, ref: 'Message' },
    admin: { type: Schema.ObjectId, ref: 'User' },
    deputyAdmins: [{ type: Schema.ObjectId, ref: 'User' }],
}, {
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, conversationSchema)

