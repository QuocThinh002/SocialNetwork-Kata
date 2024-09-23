// const { constant } = require('lodash');
const UserModel = require('../models/user.model');
const ConversationModel = require('../models/conversation.model');
const FriendRequestModel = require('../models/friendRequest.model');
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
                message: user ? 'get info successfully' : 'Something went wrong!',
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
                    const friend = await UserModel.findById(item.userId).lean().select('id name profilePicture');
                    return friend;
                })
            );

            


            return res.status(200).json({
                status: true,
                message: 'Get friends successfully',
                friends: friends,
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
            console.log({ profilePicture, coverPhoto })

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
            const meId = req?.user?.userId;

            if (!userId) {
                return res.status(200).json({
                    status: false,
                    message: 'No right'
                })
            }

            const user = await UserModel.findById(userId).select('name profilePicture coverPhoto bio gender friends').lean();
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'User not found'
                });
            }

            const me = await UserModel.findById(meId).select('friends').lean();
            
            const userFriendIds = user?.friends?.map(f => f?.userId?.toString()) || [];
            const meFriendIds = me?.friends?.map(f => f?.userId?.toString()) || [];

            // console.log(userFriendIds)
            // console.log(meFriendIds)

            // Tìm bạn chung (mutual friends) giữa user và friend
            const mutualFriends = meFriendIds?.filter(friendId => userFriendIds?.includes(friendId)) || [];
            // console.log(mutualFriends)

            return res.status(200).json({
                status: true,
                message: 'Get friends successfully',
                user: user ? getInfoData({ fileds: ['name', 'profilePicture', 'coverPhoto', 'bio', 'gender'], object: user }) : null,
                mutualFriends

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

            const user = await UserModel.findOne({ email }).lean().select('_id name profilePicture');

            return res.status(200).json({
                success: !!user,
                message: user ? 'search successfully' : 'error',
                user: user
            });
        } catch (error) {

        }
    }

    addFriend = async (req, res) => {
        try {
            console.log('[PATCH]::addfriend::');
            const { friendId } = req.body
            const { userId } = req.user;

            // console.log({friendId, userId})
            if (!friendId || !userId) {
                return res.status(404).json({
                    status: false,
                    message: 'No right'
                })
            }

            const user = await UserModel.findById(userId);
            const friend = await UserModel.findById(friendId);

            if (!user || !friend) {
                return res.status(404).json({
                    status: false,
                    message: 'User or friend not found'
                });
            }

            // Check if they are already friends
            const userHasFriend = user.friends.findIndex(friend => friend.userId === friendId);
            // const friendHasUser = friend.friends.findIndex(friend => friend.userId === userId);

            // console.log({ userHasFriend, friendHasUser })


            if (userHasFriend !== -1 ) { //&& friendHasUser !== -1
                return res.status(400).json({
                    status: false,
                    message: 'Already friends'
                });
            }


            const friendRequestUser = await FriendRequestModel.findOne({ fromUser: friendId, toUser: userId });
            let userRequestFriend = await FriendRequestModel.findOne({ fromUser: userId, toUser: friendId});

            if (friendRequestUser?.status === 'pending') {
                user.friends.push({
                    userId: friendId,
                    alias: friend.name,
                })

                friend.friends.push({
                    userId: userId,
                    alias: user.name,
                })

                friendRequestUser.status = 'accepted';
                if (userRequestFriend?.status) userRequestFriend.status = 'accepted'

                await user.save()
                await friend.save()
                await friendRequestUser.save()
                await userRequestFriend.save()
            }
            
            if (userRequestFriend?.status === 'rejected') {
                console.log('rejected:::::')
                userRequestFriend.status = 'pending'
                await userRequestFriend.save()
            }


            if (!userRequestFriend) {
                userRequestFriend = await FriendRequestModel.create({fromUser: userId, toUser: friendId})
            }

            return res.status(200).json({
                success: true,
                message: 'Friend request successfully',
            });
        } catch (error) {
            console.error('Error adding friend:', error);
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            });
        }
    }

    getFriendRequests = async (req, res) => {
        try {
            console.log('[GET]::friendRequests::');
            const { userId } = req.user;

            if (!userId) {
                return res.status(404).json({
                    status: false,
                    message: 'No right'
                })
            }

            const friendsToUser = await FriendRequestModel.find({ toUser: userId, status: 'pending' });
            const userToFriends = await FriendRequestModel.find({ fromUser: userId, status: 'pending' });
            console.log({friendsToUser, userToFriends})

            return res.status(200).json({
                success: true,
                message: 'getFriends successfully',
                friendRequests: friendsToUser,
                sentFriendRequests: userToFriends

            });
        } catch (error) {
            console.error('Error adding friend:', error);
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            });
        }
    }

    cancelAddFriend = async (req, res) => {
        try {
            console.log('[PATCH]::cancelAddFriend::');
            const { friendId } = req.body
            const { userId } = req.user;

            // console.log({friendId, userId})
            if (!friendId || !userId) {
                return res.status(404).json({
                    status: false,
                    message: 'No right'
                })
            }

            let userRequestFriend = await FriendRequestModel.findOne({ fromUser: userId, toUser: friendId });

            if (userRequestFriend?.status === 'pending') {
                userRequestFriend.status = 'rejected'
                await userRequestFriend.save()
            }

            return res.status(200).json({
                success: true,
                message: 'Cancel Add Friend successfully',
            });
        } catch (error) {
            console.error('Error adding friend:', error);
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            });
        }
    }

}

module.exports = new UserController();