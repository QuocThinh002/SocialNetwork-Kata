
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const JWT = require('jsonwebtoken')

const userModel = require('../models/user.model')

const { getInfoData, getInfoDataOmit } = require('../utils')
const { generateAccessToken, generateRefreshToken, generatePasswordResetToken } = require('../middleware/jwt')
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

            const info = await sendMail({ email, subject, html });


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

            const accessToken = generateAccessToken(user._id, user.role);
            const refreshToken = generateRefreshToken(user._id);
            user.refreshToken = refreshToken;
            await user.save();
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

            return res.status(200).json({
                code: 200,
                status: true,
                token: accessToken,
                user: getInfoData({ fileds: ["_id", "name", "email", "profilePicture", "coverPhoto", "bio", "gender", "friends", "blockUsers", "status", "notifications"], object: user.toObject() }),
            })
        } catch (error) {

        }
    }

    signOut = async (req, res) => {
        try {
            console.log("signout:::")
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken) {
                return res.status(200).json({
                    status: false,
                    message: 'sign out fail'
                })
            }
            const user = await userModel.findOne({ refreshToken });

            if (!user) {
                return res.status(200).json({
                    status: false,
                    message: 'sign out fail'
                });
            }
            console.log(user)

            // Xóa cả access token và refresh token
            user.refreshToken = '';
            await user.save();

            res.clearCookie('refreshToken', { httpOnly: true, secure: true });
            res.clearCookie('accessToken', { httpOnly: true, secure: true });

            return res.status(200).json({
                status: true,
                message: 'logout is done'
            });
        } catch (error) {

        }
    };

    forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;

            const user = await userModel.findOne({ email });
            const passwordResetToken = generatePasswordResetToken(user.id);
            user.passwordResetToken = passwordResetToken;
            user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
            await user.save();

            const resetURL = `${process.env.CLIENT_URL}/reset-password/${passwordResetToken}`;

            const subject = 'Forgot Password Kata';
            const html = `
                <div style="background-color: #f5f5f5; padding: 20px;">
                    <p style="color: #666;">Dear <b>${user.name}</b>, You requested a password reset. Please click the button below to reset your password:</p>
                    <div>
                        <a href="${resetURL}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                        <p>Or visit link: ${resetURL}</p>
                        <p style="color: #666;">This link is valid for only 10 minutes.</p>
                        <p style="color: #666;">If you did not request a password reset, please ignore this email.</p>
                    </div>
                </div>
            `;


            const info = await sendMail({ email, subject, html });
            res.status(200).json({ code: 200, status: true, info })
        } catch (error) {
            res.status(500).json({ code: 'xxx', status: false, message: error.message });
        }
    }

    resetPassword = async (req, res) => {
        try {
            const { token } = req.params;

            const decodeToken = JWT.verify(token, process.env.JWT_SECRET);

            const user = await userModel.findOne({ _id: decodeToken.userId, passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } });
            if (!user) return res.status(200).json({ code: 401, status: false, message: 'Token is invalid or has expired.' });

            user.password = req.body.password;
            user.passwordChangedAt = Date.now();
            user.passwordResetExpires = undefined;
            user.passwordResetToken = undefined;
            await user.save();

            const email = user.email;
            const subject = 'Kata Password Reset Confirmation';
            const html = `
                <div style="background-color: #f5f5f5; padding: 20px;">
                    <p>Hi <b>${user.name}</b>, <br>Your password has been successfully changed. If you did not request this change, please contact us immediately at <b>support@kata.com</b>.</p>
                    <p>Sincerely,</p>
                    <p>Kata</p>
                </div>
                `;


            const info = await sendMail({ email, subject, html });
            res.status(200).json({ code: 200, status: true, message: 'Password reset successfully', info })
        } catch (error) {
            res.status(500).json({ code: 'xxx', status: false, message: error.message });
        }
    }


}

module.exports = new AccessController()