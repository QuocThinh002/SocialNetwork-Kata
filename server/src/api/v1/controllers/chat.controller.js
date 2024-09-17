const ChatModel = require('../models/chat.model');
const UserModel = require('../models/user.model');
const ConversationModel = require('../models/conversation.model');
const { getInfoData, getInfoDataOmit } = require('../utils');

class ChatController {

    getConversation = async (req, res) => {
        try {
            const { userId } = req.user;
            const { conversationId } = req.params;

            if (!userId || !conversationId) {
                return res.status(401).json({
                    status: false,
                    message: 'No right'
                })
            }

            const messages = await ChatModel.find({ deleted: false, conversationId }).lean();

            // Trích xuất userIds độc nhất
            const userIds = Array.from(new Set(messages.map(msg => msg.senderId)));

            // Tạo danh sách promises để lấy thông tin người dùng
            const userPromises = userIds.map(userId => UserModel.findById(userId).lean().select('_id name profilePicture'));

            // Đợi tất cả promises hoàn thành và lấy thông tin người dùng
            const users = await Promise.all(userPromises);

            // Tạo một object từ userId để tra cứu nhanh
            const userMap = users.reduce((acc, user) => {
                acc[user._id] = user;
                return acc;
            }, {});

            console.log('users::', users)

            console.log('userMap::', userMap)

            // Tạo dữ liệu trả về với thông tin người gửi
            const data = messages.map(message => {
                const user = userMap[message.senderId];
                // tối ưu lại ở đây không trả về profile và sendername
                // vì 1 người gửi rất nhiều tin, 2 trường này sẽ bị lặp rất nhiều
                // => trả về thêm 1 set chứa userid, name, profilePicture
                // đã làm ròi á
                return {
                    ...message,
                    senderName: user ? user.name : 'Unknown',
                    profilePicture: user ? user.profilePicture : 'default-avatar.png'
                };
            });

            // console.log('data::', data)

            return res.status(200).json({
                success: !!data,
                messages: data ? data : []
            })
        } catch (error) {

        }
    }

    getConversations = async (req, res) => {
        try {
            console.log('[GET]:::conversations')
            const { userId } = req.user;

            if (!userId) {
                return res.status(401).json({
                    status: false,
                    message: 'No right'
                })
            }

            const convs = await ConversationModel.find({
                deleted: false,
                members: {
                    $elemMatch: { userId: userId }
                }
            }).sort({updatedAt: -1}).lean();

            const conversations = await Promise.all(convs.map(async (conv) => {
                if (conv.isGroup) {
                    // Nếu là nhóm (isGroup = true), lấy 4 thành viên đầu tiên
                    const membersDetails = await Promise.all(
                        conv.members.slice(0, 4).map(async (member) => {
                            const user = await UserModel.findById(member.userId).select('profilePicture name').lean();
                            return {
                                profilePicture: user.profilePicture,
                                name: user.name
                            };
                        })
                    );
                    return {
                        ...conv,
                        members: membersDetails
                    };

                } else {
                    // Nếu không phải là nhóm (isGroup = false), lấy toàn bộ user
                    const membersDetails = await Promise.all(
                        conv.members.map(async (member) => {
                            const user = await UserModel.findById(member.userId).select('profilePicture name').lean();
                            return {
                                userId: user.userId,
                                profilePicture: user.profilePicture,
                                name: user.name
                            };
                        })
                    );
                    return {
                        ...conv,
                        members: membersDetails
                    };
                }
            }));


            console.log('convs::', convs)

            return res.status(200).json({
                success: !!convs,
                convs: conversations
            })
        } catch (error) {

        }
    }

    getCreateConversation = async (req, res) => {
        console.log('[POST]::create-conversation::')
        try {
            const { userId } = req.user;
            const { orderUserId } = req.params;

            console.log(userId, orderUserId)

            // Kiểm tra xem cuộc trò chuyện giữa hai người dùng đã tồn tại chưa
            let conversation = await ConversationModel.findOne({
                isGroup: false,
                'members.userId': { $all: [userId, orderUserId] } // Check that both userId1 and userId2 exist in members.userId
            }).lean();


            console.log('Conversation::', conversation)


            // Nếu chưa có cuộc trò chuyện, tạo mới
            if (!conversation) {
                conversation = await ConversationModel.create({
                    isGroup: false,
                    members: [{ userId }, { userId: orderUserId }]
                });
            }
            console.log('create okok::')
            return res.status(200).json({
                success: !!conversation,
                conversationId: conversation ? conversation._id : null
            })
        } catch (error) {

        }
    }

    createGroup = async (req, res) => {
        console.log('[POST]::create-group::')
        try {
            const { userId } = req.user;
            const { groupName, selectedFriends } = req.body;
            const avatar = req.files?.avatar[0]?.path;
            // console.log({ groupName, avatar, selectedFriends })

            // console.log(userId)
            if (selectedFriends?.length < 2) {
                return res.status().json({
                    success: false,
                    message: 'it nhat 2 nguoi'
                })
            }
            const members = [{ userId, role: 'supperAdmin' }]
            selectedFriends.forEach(friendId => {
                members.push({userId: friendId})
            });

            const conversation = await ConversationModel.create({
                isGroup: true,
                members,
                avatar,
                name: groupName
            });

            // console.log('create okok::')
            return res.status(200).json({
                success: !!conversation,
                conversationId: conversation ? conversation._id : null
            })
        } catch (error) {
            console.error('error', error)
        }
    }
}

module.exports = new ChatController();