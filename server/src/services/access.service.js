const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userModel = require('../models/user.model')

const { getInfoData } = require('../utils')
const { createTokenPair } = require('../auth/authUtils')
const KeyTokenService = require('./keyToken.service')


class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // step1: check email exists???
            const user = await userModel.findOne({email}).lean()
            
            console.log({user})
            if (user) {
                return {
                    code: 'xxx',
                    status: false,
                    message: 'User already registered!'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10)
            
            const newUser = await userModel.create({ name, email, password: passwordHash })
            
            if (newUser) {
                const publicKey = crypto.randomBytes(64).toString('hex')
                const privateKey = crypto.randomBytes(64).toString('hex')
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newUser._id,
                    publicKey,
                    privateKey
                })

                if (!keyStore) {
                    return {
                        code: 'xxx',
                        message: 'keyStore error'
                    }
                }
                
                // create token pair
                const tokens = await createTokenPair({userId: newUser._id, email}, publicKey, privateKey)
                
                return {
                    code: 201,
                    user: getInfoData({ fileds: ['_id', 'name', 'email'], object: newUser }),
                    tokens
                }
            }

            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxx',
                status: 'error',
                message: error.message
            }
        }
    }
}

module.exports = AccessService