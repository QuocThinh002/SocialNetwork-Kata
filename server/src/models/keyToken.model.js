
const {model, Schema} = require('mongoose')

const DOCUMENT_NAME = 'KeyToken'
const COLLECTION_NAME = 'KeyTokens'

const keyTokenSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        require: true,
        ref: 'User'
    },
    publicKey: { type: String, require: true },
    privateKey: {type: String, require: true},
    refreshToken: {type: Array, default: []}
}, {
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)