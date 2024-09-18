const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Post'
const COLLECTION_NAME = 'Posts'

const postSchema = new mongoose.Schema(
    {
        
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