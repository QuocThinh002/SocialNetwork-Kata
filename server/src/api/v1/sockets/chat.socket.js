const chatModel = require('../models/chat.model')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')
const ConversationModel = require('../models/conversation.model')

const {uploadImage, uploadBuffer} = require('../configs/cloudinary.config')

module.exports = (io) => {
    // xác thực token => userId
    io.use((socket, next) => {
        const token = socket.handshake.query.token;
    
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return next(new Error('Authentication error'));
                }
                socket.userId = decoded.userId; // Lưu userId vào socket object
                next();
            });
        } else {
            next(new Error('Authentication error'));
        }
    });


    io.on('connection', (socket) => {
        console.log('User connected: ', socket.id);

        socket.on('CLIENT_SEND_MESSAGE', async (data) => {

            const conversation = await ConversationModel.findById(data.conversationId);
            const existConv = conversation.members.findIndex(member => member.userId === socket.userId)
            if (existConv) {
                socket.join(data.conversationId)
            }
            // socket.join(data.conversationId)

            // console.log(data)
            const images = [];


            if (data.images) {
                let imgs = data.images;
                if (imgs.length > 6) imgs = imgs.slice(0, 6);

                for (const imageBuffer of imgs) {
                    const link = await uploadBuffer(imageBuffer);
                    // console.log(link)
                    images.push(link);
                }
            }
            
            // save to database
            const chat = new chatModel({
                senderId: socket.userId,
                content: data.content,
                conversationId: data.conversationId,
                images: images
            })
            await chat.save()

            conversation.lastMessage.content = data.content;
            conversation.lastMessage.senderId = socket.userId
            await conversation.save()

            // Truy xuất tên người gửi từ cơ sở dữ liệu
            const user = await UserModel.findById(socket.userId).lean().select('name profilePicture');
            const sender = user ? user : 'Unknown';
            // console.log('user::', user)

            // return for client
            io.to(data.conversationId).emit('SERVER_RETURN_MESSAGE', {
                conversationId: data.conversationId,
                content: data.content,
                senderId: socket.userId,
                senderName: sender.name,
                profilePicture: sender.profilePicture,
                images: images,
            });
        });

        socket.on('CLIENT_SEND_TYPING', (data) => {
            socket.broadcast.to(data.conversationId).emit('SERVER_RETURN_TYPING', data);
        });

        socket.on('CLIENT_STOP_TYPING', (data) => {
            socket.join(data.conversationId)
            socket.broadcast.to(data.conversationId).emit('SERVER_STOP_TYPING', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected: ', socket.id);
        });
    });
};