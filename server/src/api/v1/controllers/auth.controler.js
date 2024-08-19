
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
            
            // Check for missing inputs (400 Bad Request)
            if (!name || !email || !password) {
                return res.status(200).json({
                    code: 'xxx1',
                    status: false,
                    message: 'Missing input!'
                })
            }

            // Step 1: Check email exists (409 Conflict)
            const user = await userModel.findOne({ email }).lean()
            if (user) {
                return res.status(200).json({
                    code: 'xxx2',
                    status: false,
                    message: 'User already registered!'
                })
            }

            const verificationToken = crypto.randomBytes(32).toString('hex')
            const newUser = await userModel.create({ name, email, password, verificationToken })

            // Internal Server Error (500)
            if (!newUser) {
                return res.status(200).json({
                    code: 500,
                    status: false,
                    message: 'Something went wrong!'
                })
            }

            const verifyURL = `${process.env.CLIENT_URL}/verify-account/${verificationToken}`;
            const subject = 'Verify Account Kata';
            const html = `
                <div style="background-color: #f5f5f5; padding: 20px;">
                    <p style="color: #666;">Dear
                        <b style="color: #000;">${name}</b>,<br/>
                        You requested to verify your account. <br>
                        Please click the button below to complete the verification process:
                    </p>
                    <div>
                        <a href="${verifyURL}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Account</a>
                        <p>Or visit link: ${verifyURL}</p>
                        <p style="color: #666;">This link is valid for only 10 minutes.</p>
                        <p style="color: #666;">If you did not request a signup account, please disregard this email.</p>
                    </div>
                </div>
            `;

            const info = await sendMail({ email, subject, html});


            // 201: CREATED
            return res.status(201).json({
                code: 201,
                status: true,
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
            const user = await userModel.findOne({ verificationToken, status: ['inactive'] })
            
            if (!user) {
                return res.status(200).json({
                    code: 500,
                    status: false,
                    message: 'Something went wrong! Please try again...'
                })
            }
            user.status = 'active'
            await user.save()
            return res.status(200).json({
                code: 200,
                status: true,
                message: 'Verify account successfully!'
            })
        } catch (error) {
            
        }
    }

    signIn = async (req, res) => {
        try {
            console.log(`[P]::Login::`, req.body)
            const { email, password } = req.body
            // Check for missing inputs (400 Bad Request)
            if (!email || !password) {   
                return res.status(200).json({
                    code: 'xxx',
                    status: false,
                    message: 'Missing input!'
                })
            }


            const user = await userModel.findOne({ email })
            // User not found (401 Unauthorized)
            const isCorrectPassword = await user?.isCorrectPassword(password)
            if (!user || !isCorrectPassword) {
                return res.status(200).json({
                    code: 'xxx',
                    status: false,
                    message: 'Wrong email or password!'
                })
            }

            if (user.status == 'inactive') {
                return res.status(200).json({
                    code: 'xxx',
                    status: false,
                    message: 'Account is not verified or disabled'
                })
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