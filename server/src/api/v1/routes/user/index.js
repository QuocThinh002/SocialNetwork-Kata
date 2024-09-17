const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const {uploadImage} = require('../../configs/cloudinary.config')


router.get('/me', UserController.getMe)
router.patch('/updateMe',
    uploadImage.fields([
        { name: 'profilePicture', maxCount: 1 },
        { name: 'coverPhoto', maxCount: 1 }
    ]),
    UserController.updateMe
);
router.patch('/cancelAddFriend', UserController.cancelAddFriend)

router.post('/addFriend', UserController.addFriend)

router.get('/friendRequests', UserController.getFriendRequests)
router.get('/friends', UserController.getFriends);
router.get('/user/:userId', UserController.getUser)
router.get('/search', UserController.searchUser)



module.exports = router;