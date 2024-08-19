
const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

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
    verificationToken: String,
    refreshToken: String,
    passwordChangedAt: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) 
        next();
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    },
    createPasswordChangedToken: function() {
        const resetToken = crypto.randomBytes(64).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 10*60*1000; // ten minutes
        return resetToken;
    }
}

module.exports = model(DOCUMENT_NAME, userSchema)