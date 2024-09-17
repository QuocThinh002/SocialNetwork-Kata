const mongoose = require('mongoose')
const { Schema } = mongoose;

const DOCUMENT_NAME = 'FriendRequest'
const COLLECTION_NAME = 'FriendRequests'

const friendRequestSchema = new Schema(
    {
        fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
        toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },    
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }, 
        message: { type: String, trim: true, maxLength: 255 },  // Tin nhắn đi kèm
        sentAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

module.exports = mongoose.model(DOCUMENT_NAME, friendRequestSchema)