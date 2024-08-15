
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userModel = require('../models/user.model')

const { getInfoData, getInfoDataOmit } = require('../utils')
const { generateAccessToken, generateRefreshToken } = require('../middleware/jwt')
const sendMail = require('../utils/sendMail')

class AccessController {

    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body)
            const { name, email, password } = req.body
            // 201: CREATED
            if (!name || !email || !password) {
                return {
                    code: 'xxx',
                    status: false,
                    messageg: 'Missing input!'
                }
            }

            // step1: check email exists???
            const user = await userModel.findOne({ email }).lean()

            if (user) {
                return {
                    code: 'xxx',
                    status: false,
                    message: 'User already registered!'
                }
            }

            const verificationToken = crypto.randomBytes(32).toString('hex')
            const newUser = await userModel.create({ name, email, password, verificationToken })

            if (!newUser) {
                return {
                    code: 500,
                    status: false,
                    message: 'Something went wrong!'
                }
            }

            const verifyURL = `${req.protocol}://${req.get('host')}/verifyAccount/${verificationToken}`;
            const subject = 'Verify Account Kata';
            // style="width: 100%; aspect-ratio: 1/2
            const html = `
                <div style="background-color: #f5f5f5; padding: 20px;">
                    <p style="color: #666;">Dear <b style="color: #000;>${name}</b>, <br/>You requested to verify your account. <br>Please click the button below to complete the verification process:</p>
                    <div style="text-align: center;">
                    <a href="${verifyURL}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Account</a>
                    <p style="color: #666;">This link is valid for only 10 minutes.</p>
                    <p style="color: #666;">If you did not request a signup account, please disregard this email.</p>
                    </div>
                </div>
            `;

            const info = await sendMail({ email, subject, html});



            return res.status(201).json({
                code: 201,
                user: getInfoData({ fileds: ['_id', 'name', 'email'], object: newUser }),
                info
            })
        } catch (error) {
            next(error)
        }
    }

    verifyAccount = async (req, res) => {
        try {
            const { verificationToken } = req.params;
            const user = await userModel.findOne({ verificationToken, status: 'inactive' })
            if (!user) {
                return res.status(404).json({
                    code: 404,
                    message: 'user not found!'
                })
            }
            user.status = 'active'
            await user.save()
            return res.status(200).json({
                code: 200,
                message: 'verify account successfully!'
            })
        } catch (error) {
            
        }
    }

    signIn = async (req, res) => {
        try {
            console.log(`[P]::Login::`, req.body)
            const { email, password } = req.body
            if (!email || !password) {
                return {
                    code: 'xxx',
                    status: false,
                    messageg: 'Missing input!'
                }
            }

            const user = await userModel.findOne({ email })
            if (!user) {
                return {
                    code: 'xxx',
                    status: false,
                    messageg: 'Email not registered!'
                }
            }

            const isCorrectPassword = await user.isCorrectPassword(password)
            if (!isCorrectPassword) {
                return {
                    code: 'xxx',
                    status: false,
                    messageg: 'Wrong email or password!'
                }
            }

            const { refreshToken } = user
            const accessToken = generateAccessToken(user._id, user.role);
            const newRefreshToken = generateRefreshToken(user._id);
            await userModel.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken }, { new: true });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

            return res.status(200).json({
                code: 200,
                status: true,
                token: accessToken,
                user: getInfoDataOmit({ fileds: ['role', 'password', 'refreshToken'], object: user.toObject() }),
            })
        } catch (error) {

        }
    }


}

module.exports = new AccessController()