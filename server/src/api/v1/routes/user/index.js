const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const {uploadImage} = require('../../configs/cloudinary.config')

const { verifyAccessToken } = require('../../middleware/verifyToken')


router.get('/getMe', [verifyAccessToken], UserController.getMe)
router.patch('/updateMe',
    [verifyAccessToken],
    uploadImage.fields([
        { name: 'profilePicture', maxCount: 1 },
        { name: 'coverPhoto', maxCount: 1 }
    ]),
    UserController.updateMe
);




module.exports = router;