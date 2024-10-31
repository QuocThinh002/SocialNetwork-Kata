const mongoose = require('mongoose')
const { Schema } = mongoose;

const DOCUMENT_NAME = 'Post'
const COLLECTION_NAME = 'Posts'

const postSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: String,
        images: [String],
        video: String,
        tags: [String],
        taggedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        parentTop: { type: Schema.Types.ObjectId, ref: 'Post' },
        parent: { type: Schema.Types.ObjectId, ref: 'Post' },
        typePost: { type: String, enum: ['post', 'postshare', 'comment'], default: 'post' },
        audience: {type: String, enum: ['friends', 'private'], default: 'friends'},
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

module.exports = mongoose.model(DOCUMENT_NAME, postSchema)