import React, { useCallback, useEffect, useRef, useState } from 'react';
import { socket } from '../../../../socket';
import { FaBars, FaRegFaceSmile, FaShare, FaTrash, FaXmark } from 'react-icons/fa6';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { MdAttachFile } from 'react-icons/md';
import './chatView.scss';
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { apiGetConversation } from '../../services/chat.service';
import { useSearchParams } from 'react-router-dom';
import ChatInfo from "./chatInfo";
import ModalForward from '../../components/ModalForward';

const ChatView = () => {
    const { user } = useSelector(state => state.userReducer);
    const [messages, setMessages] = useState([]);
    const [conv, setConv] = useState();
    const [msg, setMsg] = useState('');
    const [images, setImages] = useState([]);
    const [imagesUrl, setImagesUrl] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const typingTimeoutRef = useRef(null); // Ref để theo dõi thời gian gõ
    const [searchParams, setSearchParams] = useSearchParams()
    const convId = searchParams.get('convId');
    const [isOpenForward, setIsOpenForward] = useState(false);
    const [messageForward, setMessageForward] = useState('');
    const [imagesForward, setImagesForward] = useState([]);
    const [isOpenInfo, setIsOpenInfo] = useState(true);
    const [friendInfo, setFriendInfo] = useState();
    const [memberList, setMemberList] = useState([]);


    const MAX_IMAGES = 6;

    const handleTyping = useCallback(() => {
        // Nếu đã có một timeout đang chạy, xóa nó
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // console.log(convId)
        // Gửi thông tin typing khi người dùng gõ tin nhắn
        socket.emit('CLIENT_SEND_TYPING', { userId: user?._id, userName: user?.name, conversationId: convId });

        // Thiết lập một timeout để xóa thông tin typing sau 2 giây không gõ
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('CLIENT_STOP_TYPING', { userId: user?._id, conversationId: convId });
        }, 2000);
    }, [user?._id, user?.name]);

    const handleEmojiClick = (emojiData) => {
        setMsg((prevMsg) => prevMsg + emojiData.emoji);
        setShowPicker(false);
    };

    const handleImageChange = (e) => {
        let files = Array.from(e.target.files);
        if (images.length + files.length > MAX_IMAGES) {
            alert(`You can only upload up to ${MAX_IMAGES} images.`);
            files = files.slice(0, MAX_IMAGES - images.length);
        }

        const newImageUrls = files.map((file) => URL.createObjectURL(file));

        setImages((prevImages) => [...prevImages, ...files]);
        setImagesUrl((prevImagesUrl) => [...prevImagesUrl, ...newImageUrls]);
    };

    const handleSendMessage = useCallback((e) => {
        e.preventDefault();
        if (msg.trim() || images.length) {
            socket.emit('CLIENT_SEND_MESSAGE', { conversationId: convId, content: msg.trim(), images });
            setMsg('');
            setImages([]);
            setImagesUrl([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = null; // Reset giá trị input file
            }
        }
    }, [msg, images]);

    const handleClosePreviewImage = () => {
        setImages([]);
        setImagesUrl([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Reset giá trị input file khi đóng preview
        }
    };

    const handleClosePreviewImageItem = (image) => {
        const index = imagesUrl.indexOf(image);

        if (index !== -1) {
            const newImagesUrl = imagesUrl.filter((_, i) => i !== index);
            const newImages = images.filter((_, i) => i !== index);

            setImagesUrl(newImagesUrl);
            setImages(newImages);

            // Update the file input
            const dataTransfer = new DataTransfer();
            newImages.forEach((file) => {
                dataTransfer.items.add(file);
            });
            fileInputRef.current.files = dataTransfer.files; // Update file input with remaining files
        }
    };

    useEffect(() => {
        const handleTyping = (data) => {
            const exists = typingUsers.some(user => user?.userId === data.userId);

            // console.log('data::', data)
            // console.log('exists::', exists)
            // console.log('typingUsers::', typingUsers)
            // console.log('----------------------------------\n')

            if (!exists)
                setTypingUsers(prevTypingUsers => [...prevTypingUsers, data]);;
        };

        const handleStopTyping = (data) => {
            setTypingUsers(prevTypingUsers => prevTypingUsers.filter(user => user?.userId !== data.userId));
        };

        socket.on('SERVER_RETURN_TYPING', handleTyping);
        socket.on('SERVER_STOP_TYPING', handleStopTyping);

        return () => {
            socket.off('SERVER_RETURN_TYPING', handleTyping);
            socket.off('SERVER_STOP_TYPING', handleStopTyping);
        };
    }, []);

    // console.log(typingUsers)


    useEffect(() => {
        if (msg) {
            handleTyping();
        } else {
            // Xóa thông tin "typing" nếu không còn gõ
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            socket.emit('CLIENT_STOP_TYPING', { userId: user?._id });
        }
    }, [msg, handleTyping, user?._id]);

    useEffect(() => {
        const handleMessageReceive = (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        };

        socket.on('SERVER_RETURN_MESSAGE', handleMessageReceive);

        // return () => {
        //     socket.off('SERVER_RETURN_MESSAGE');
        // };
    }, []);

    // console.log("convId::", convId)

    useEffect(() => {
        const func = async () => {
            const response = await apiGetConversation(convId);
            const msgs = response?.data?.messages || [];
            const conversation = response?.data?.conversation;
            const friendInfo = response?.data?.friendInfo;
            const memberList = response?.data?.memberList;
            setMemberList(memberList);
            setFriendInfo(friendInfo);
            setConv(conversation);
            setMessages(msgs);
            // setConv(response?.data)
            // console.log('conversation::::::', response)
        };
        func();
        // alert(convId)
        // console.log("messages::", messages)
    }, [convId]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' }); // Tự động cuộn xuống cuối cùng
        }
    }, [convId, messages]);

    const handleForward = (message) => {
        // alert(message)
        setMessageForward(message);
        setIsOpenForward(true);
    }

    const handleImagesForward = (imgs) => {
        setImagesForward(imgs);
        console.log(imagesForward)
        setIsOpenForward(true);
    }

    return (<>
        {convId ? <>
            {isOpenForward && <ModalForward setIsOpenModal={setIsOpenForward} messageForward={messageForward} imagesForward={imagesForward} />}
            <div className='chat-view'>
                <div className='chat-view__head'>
                    <div className='chat-view__head__avatar'>
                        {conv?.isGroup ? <>
                            {conv?.avatar ? <img src={conv?.avatar} /> : <div className='chat-view__head__avatars'>
                                {memberList?.slice(0,4)?.map(item => <img src={item.profilePicture} />)}
                            </div>}
                            {conv?.name ? <h2>{conv?.name}</h2> : <h2>No Name Group</h2>}
                        </> : <>
                            <img src={friendInfo?.profilePicture} />
                            {friendInfo?.name ? <h2>{friendInfo?.name}</h2> : <h2>No Name Group</h2>}
                            
                        </>}
                    </div>
                    

                    <div onClick={() => setIsOpenInfo(!isOpenInfo)} className='chat-view__head__info'>
                        <FaBars />
                    </div>
                </div>
                <div className={'chat-view__main isPreview-' + imagesUrl.length}>
                    {messages.length !== 0 && <div>
                        {messages.map((message, idx) => (
                            <div className={(user?._id === message.senderId) ? 'chat-view__outgoing' : 'chat-view__incoming'} key={idx}>
                                {user?._id !== message.senderId && <div className='box-msg'>
                                    <div className='chat-view__profile-picture'>
                                        <img src={message.profilePicture} alt="profile" />
                                    </div>
                                    <span className='box-msg__sender-name'>{message.senderName}</span>
                                </div>}
                                {message.content && <p className={'content-msg'}>{message.content}<span onClick={() => handleForward(message.content)} className='chat-forward'><FaShare /></span></p>}
                                {message.images && message.images.length > 0 && (
                                    <div className={'content-img content-img-' + ((message.images.length === 1) ? 'one' : (message.images.length % 2 === 1 ? 'odd' : 'even'))}>
                                        {message.images.map((image, idx) => (
                                            <img src={image} alt={`img-${idx}`} key={idx} />
                                        ))}
                                        <span onClick={() => handleImagesForward(message.images)} className='chat-forward'><FaShare /></span>
                                    </div>
                                )}

                            </div>
                        ))}

                    </div>}


                    <div ref={chatEndRef}></div>
                </div>
                <div className='chat-view__foot'>
                    {imagesUrl && imagesUrl.length > 0 && (
                        <div className='preview-images'>
                            <button onClick={handleClosePreviewImage} className='preview-images__close'><FaXmark /></button>
                            {imagesUrl.map((image, idx) => (
                                <div className='preview-images__item' key={idx}>
                                    <img src={image} alt={`preview-${idx}`} />
                                    <button onClick={() => handleClosePreviewImageItem(image)} className='preview-images__item__close'><FaTrash /></button>
                                </div>
                            ))}
                        </div>
                    )}
                    {typingUsers.length > 0 && (
                        <div className='list-typing'>
                            <div className='list-typing__box'>
                                <div className='list-typing__box__name'>
                                    {typingUsers[0].userName}
                                </div>
                                <div className='list-typing__box__dots'>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <form className='chat-view__foot__form-msg' onSubmit={handleSendMessage}>
                        <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={'Nhập tin nhắn...'} />
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            id='upload-images'
                            ref={fileInputRef} // Gắn ref vào input file
                        />
                        <div className='chat-view__foot__emoji-box'>
                            <button type='button' className='chat-view__foot__emoji-box__icon' onClick={() => setShowPicker(!showPicker)}><FaRegFaceSmile /></button>
                            {showPicker && (
                                <div className='chat-view__foot__emoji-box__emoji'>
                                    <EmojiPicker onEmojiClick={handleEmojiClick} suggestedEmojisMode='recent' skinTonesDisabled={true} searchDisabled={true} emojiStyle='facebook' />
                                </div>
                            )}
                        </div>
                        <label htmlFor='upload-images' className='attach-file'><MdAttachFile /></label>
                        <button type='submit' className='chat-view__foot__send'><RiSendPlane2Fill /></button>
                    </form>
                </div>
            </div>
        </> : <>
            <div className='chat-none'>
                Chao mung ban den voi Kata
            </div>
        </>}

        {isOpenInfo && (conv || friendInfo) && <ChatInfo conv={conv} friendInfo={friendInfo} memberList={memberList}  />}
    </>
    );
};

export default ChatView;
