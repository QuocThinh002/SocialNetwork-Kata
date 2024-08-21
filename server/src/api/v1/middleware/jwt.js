const JWT = require('jsonwebtoken');

const generateAccessToken = (userId, role)  => JWT.sign({userId, role}, process.env.JWT_SECRET, {expiresIn: '2d'});
const generateRefreshToken = (userId)  => JWT.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'});
const generatePasswordResetToken = (userId)  => JWT.sign({userId}, process.env.JWT_SECRET, {expiresIn: '10m'});

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generatePasswordResetToken
}