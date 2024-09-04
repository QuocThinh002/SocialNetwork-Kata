const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const {uploadImage} = require('../../configs/cloudinary.config')


router.get('/getMe', userController.getMe)
router.patch('/updateMe',
    uploadImage.fields([
        { name: 'profilePicture', maxCount: 1 },
        { name: 'coverPhoto', maxCount: 1 }
    ]),
    userController.updateMe
);
router.get('/getFriends', userController.getFriends);
router.get('/getUser/:userId', userController.getUser)



module.exports = router;