import React, { useCallback, useEffect, useRef, useState } from 'react';
import { socket } from '../../../../socket';
import { FaRegFaceSmile, FaTrash, FaXmark } from 'react-icons/fa6';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { MdAttachFile } from 'react-icons/md';

import './chatView.scss';
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';

import { apiGetConversation } from '../../services/chat.services';
import { isAction } from 'redux';

const ChatView = () => {
    const { user } = useSelector(state => state.userReducer);
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');
    const [images, setImages] = useState([]);
    const [imagesUrl, setImagesUrl] = useState([]);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null); // Ref để truy cập input file
    const [showPicker, setShowPicker] = useState(false);
    const MAX_IMAGES = 6;

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

    useEffect(() => {
        const handleMessageReceive = (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        };

        socket.on('SERVER_RETURN_MESSAGE', handleMessageReceive);

        return () => {
            socket.off('SERVER_RETURN_MESSAGE');
        };
    }, []);

    useEffect(() => {
        const func = async () => {
            const response = await apiGetConversation();
            const msgs = response?.data?.messages;

            console.log('msgs::', msgs)

            setMessages(msgs)
            console.log("messages::", messages)
        }
        func()
    }, [])

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' }); // Tự động cuộn xuống cuối cùng
        }
    }, [messages, imagesUrl]);

    const handleSendMessage = useCallback((e) => {
        e.preventDefault();
        if (msg.trim() || images.length) {
            socket.emit('CLIENT_SEND_MESSAGE', { content: msg.trim(), images });
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
    }

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

    return (
        <div className='chat-view'>
            <div className='chat-view__head'>
                avt
            </div>
            <div className='chat-view__main'>
                {messages.length !== 0 && <div>
                    {messages.map((message, idx) => (
                        <div className={(user._id === message.senderId) ? 'chat-view__outgoing' : 'chat-view__incoming'} key={idx}>
                            {user._id !== message.senderId && <div className='box-msg'>
                                <div className='chat-view__profile-picture'>
                                    <img src={message.profilePicture} alt="profile" />
                                </div>
                                <span className='box-msg__sender-name'>{message.senderName}</span>
                            </div>}
                            {message.content && <p className={'content-msg'}>{message.content}</p>}
                            {message.images && message.images.length > 0 && (
                                <div className={'content-img content-img-' + ((message.images.length == 1) ? 'one' : (message.images.length % 2 == 1 ? 'odd' : 'even'))}>
                                    {message.images.map((image, idx) => (
                                        <img src={image} alt={`img-${idx}`} key={idx} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

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
                    <div className='list-typing'>
                        <div className='list-typing__box'>
                            <div class="list-typing__box__name"> 'name'
                                <div class="list-typing__box__dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={chatEndRef}></div>
                </div>}
            </div>
            <div className='chat-view__foot'>
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
    );
};

export default ChatView;
