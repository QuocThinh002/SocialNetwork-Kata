const userModel = require('../models/user.model');
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

            const user = await userModel.findById(userId).lean();

            return res.status(200).json({
                status: !!user,
                message: user ? 'get info successfully':'Something went wrong!',
                user: user ? getInfoDataOmit({ fileds: ["password", "role", "status", "verificationToken", "refreshToken", "passwordChangedAt", "passwordResetToken", "passwordResetExpires"], object: user }) : null
            })
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

            const user = await userModel.findByIdAndUpdate(userId, payload, { new: true }).select('-password -role -refreshToken');
            return res.status(200).json({   
                status: user ? true : false,
                user: getInfoDataOmit({ fileds: ["password", "role", "status", "verificationToken", "refreshToken", "passwordChangedAt", "passwordResetToken", "passwordResetExpires"], object: user.toObject() }),
            });
        } catch (error) {

        }
    }
}

module.exports = new UserController();