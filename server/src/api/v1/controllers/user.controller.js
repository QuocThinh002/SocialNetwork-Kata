const { constant } = require('lodash');
const UserModel = require('../models/user.model');
const { getInfoData, getInfoDataOmit } = require('../utils');

class UserController {

    getMe = async (req, res) => {
        try {
            console.log('[GET]::getMe::');
            const { userId } = req.user;

            if (!userId) {
                return res.status(200).json({
                    status: false,
                    message: 'No right'
                })
            }

            const user = await UserModel.findById(userId).lean();

            return res.status(200).json({
                status: !!user,
                message: user ? 'get info successfully':'Something went wrong!',
                user: user ? getInfoDataOmit({ fileds: ["password", "role", "status", "verificationToken", "refreshToken", "passwordChangedAt", "passwordResetToken", "passwordResetExpires"], object: user }) : null
            })
        } catch (error) {
            
        }
    }

    getFriends = async (req, res) => {
        try {
            console.log('[GET]::getFriends::');
            const { userId } = req.user;

            if (!userId) {
                return res.status(200).json({
                    status: false,
                    message: 'No right'
                })
            }

            const user = await UserModel.findById(userId).lean();
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'User not found'
                });
            }
            const friends = await Promise.all(
                user.friends.map(async (item) => {
                    const friend = await UserModel.findById(item).lean().select('id name profilePicture');
                    return friend;
                })
            );
    
            return res.status(200).json({
                status: true,
                message: 'Get friends successfully',
                friends: friends
            });
        } catch (error) {
            
        }
    }

    updateMe = async (req, res) => {
        try {
            console.log(`[PATCH]::updateMe::`)
            const { userId } = req.user;
            console.log({ userId })
            
            if (!userId || (Object.keys(req.body).length == 0 && Object.keys(req.files).length == 0)) {
                return res.status(200).json({   
                    status: false,
                    message: 'Missing input!'
                });
            }
            
            console.log('body::', req.body)
            console.log('files::', req.files)
            
            const profilePictures = req.files?.profilePicture;
            const coverPhotos = req.files?.coverPhoto;
            const profilePicture = profilePictures?.length ? profilePictures[0].path : null;
            const coverPhoto = coverPhotos?.length ? coverPhotos[0].path : null;
            console.log({profilePicture, coverPhoto})

            const payload = { ...req.body }
            if (profilePicture) payload.profilePicture = profilePicture;
            if (coverPhoto) payload.coverPhoto = coverPhoto;

            console.log({ payload })
            // const user = false;

            const user = await UserModel.findByIdAndUpdate(userId, payload, { new: true }).select('-password -role -refreshToken');
            return res.status(200).json({   
                status: user ? true : false,
                user: getInfoDataOmit({ fileds: ["password", "role", "status", "verificationToken", "refreshToken", "passwordChangedAt", "passwordResetToken", "passwordResetExpires"], object: user.toObject() }),
            });
        } catch (error) {

        }
    }

    getUser = async (req, res) => {
        try {
            console.log('[GET]::getUser::');
            const { userId } = req.params;

            if (!userId) {
                return res.status(200).json({
                    status: false,
                    message: 'No right'
                })
            }

            const user = await UserModel.findById(userId).lean();
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'User not found'
                });
            }
    
            return res.status(200).json({
                status: true,
                message: 'Get friends successfully',
                user: user ? getInfoData({ fileds: ['name', 'profilePricture', 'coverPhoto', 'bio', 'gender'], object: user }) : null
            });
        } catch (error) {
            
        }
    }

    searchUser = async (req, res) => {
        try {
            console.log('[GET]::searchUser::');
            const { email } = req.query;

            // console.log({email})
            if (!email) {
                return res.status(200).json({
                    status: false,
                    message: 'No right'
                })
            }

            const user = await UserModel.findOne({email}).lean().select('_id name profilePicture');
    
            return res.status(200).json({
                success: !!user,
                message: user ? 'search successfully' : 'error',
                user: user
            }); 
        } catch (error) {
            
        }
    }

    
}

module.exports = new UserController();