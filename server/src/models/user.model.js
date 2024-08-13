
const {model, Schema} = require('mongoose')

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 55,
        require: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        require: true
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
    },
    password: { type: String, requrire: true },
    profilePicture: { type: String, default: '' },
    coverPhoto: { type: String, default: '' },
    bio: { type: String, default: '' },
    birthday: Date,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    blockUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    notifications: [{
        type: { type: String, enum: ['friendRequest', 'like', 'comment', 'share', 'tag'] },
        content: String,
        createdAt: { type: Date, default: Date.now },
        isRead: {type: Boolean, default: false}
    }],
    role: { // luon giu lai superAdmin de tuy chinh, moderator giao cho khach
        type: String,
        enum: ['superAdmin', 'moderator', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'inactive'
    },
    passswordChangeAt: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, userSchema)