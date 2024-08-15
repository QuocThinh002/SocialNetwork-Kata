const JWT = require('jsonwebtoken');

const generateAccessToken = (userId, role)  => JWT.sign({_id: userId, role}, process.env.JWT_SECRET, {expiresIn: '2d'});
const generateRefreshToken = (userId)  => JWT.sign({_id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'});

module.exports = {
    generateAccessToken,
    generateRefreshToken
}