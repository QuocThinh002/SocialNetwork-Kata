const ChatModel = require('../models/chat.model');
const UserModel = require('../models/user.model');
const { getInfoData, getInfoDataOmit } = require('../utils');

class ChatController {

    getConversation = async (req, res) => {
        try {
            const { userId } = req.user;

            if (!userId) {
                return res.status(401).json({
                    status: false,
                    message: 'No right'
                })
            }

            const messages = await ChatModel.find({ deleted: false }).lean();

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
}

module.exports = new ChatController();