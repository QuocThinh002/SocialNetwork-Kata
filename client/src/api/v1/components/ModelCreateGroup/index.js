import { FaXmark } from 'react-icons/fa6';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modalCreateGroup.scss';
import { apiCreateGroup } from '../../services/chat.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getConversationsInfo } from '../../store/actions/chat.action';

function ModalCreateGroup({ setIsOpenModal }) {
    const { t } = useTranslation();
    const { friends } = useSelector(state => state.userReducer);
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [groupName, setGroupName] = useState('');
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true when starting the request
        
        const formData = new FormData();
        formData.append('groupName', groupName);
        formData.append('avatar', avatar);
        selectedFriends.forEach((friendId) => {
            formData.append('selectedFriends[]', friendId); // Lưu ý rằng selectedFriends là một mảng
        });

        try {
            const response = await apiCreateGroup(formData);  // Gửi formData thay vì JSON object

            if (response?.data?.success) {
                toast.success(t("group.create_group_chat_successfully"));
                await dispatch(getConversationsInfo())
                navigate(`/messages?convId=${response?.data?.conversationId}`);
                setIsOpenModal(false);  // Đóng modal khi thành công
            } else {
                toast.error(t("group.create_group_chat_fail"));
            }
        } catch (error) {
            console.error('Error while creating group:', error);
            toast.error('An error occurred while creating the group');
        } finally {
            setIsLoading(false); // Set loading to false once the request is complete
        }
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file?.type.startsWith('image/')) {
            setAvatar(file);
            setAvatarUrl(URL.createObjectURL(file));
        } else {
            toast.error(t("group.select_image_valid"));
        }
    };

    const handleFriendSelection = (friendId) => {
        setSelectedFriends(prev =>
            prev.includes(friendId)
                ? prev.filter(id => id !== friendId)
                : [...prev, friendId]
        );
    };

    return (
        <>
            <div className={`modal  ${isLoading ? 'modal--disabled' : ''}`}>
                <div className={`modal__box`}>
                    <button onClick={() => !isLoading && setIsOpenModal(false)} className="btn modal__close" disabled={isLoading}>
                        <FaXmark />
                    </button>

                    <h2 className='modal__title'>{t("group.create_group_chat")}</h2>
                    <form onSubmit={handleSubmit} className="form-create-group">
                        <div className='form-create-group__head'>
                            <div className='form-create-group__profile-picture'>
                                <label htmlFor="avatar" className='form-create-group__profile-picture__image'>
                                    <img src={avatarUrl || `${window.location.origin}/assets/image/sky.jpg`} alt='profile-picture' />
                                </label>
                                <input type="file" id="avatar" onChange={handleAvatarChange} disabled={isLoading} />
                            </div>
                            <div className='form-create-group__name'>
                                <input
                                    type='text'
                                    id='group-name'
                                    name='groupName'
                                    autoComplete='off'
                                    required
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder={t("group.enter_the_group_name")}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {friends?.length > 0 && (
                            <div className='form-create-group__select-friends'>
                                {friends.map(friend => (
                                    <div className='form-create-group__friend-item' key={friend._id}>
                                        <label htmlFor={'friend-' + friend._id}>
                                            <input
                                                type='checkbox'
                                                name="selectedFriends"
                                                id={'friend-' + friend._id}
                                                checked={selectedFriends.includes(friend._id)}
                                                onChange={() => handleFriendSelection(friend._id)}
                                                disabled={isLoading}
                                            />
                                            <img src={friend?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                            <span>{friend?.alias || friend?.name}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className='form-create-group__submit'>
                            <span onClick={() => !isLoading && setIsOpenModal(false)} className='btn btn__cancel' disabled={isLoading}>{t("group.cancel")}</span>
                            <button type="submit" className='btn btn__submit' disabled={isLoading}>
                                {isLoading ? <div className="spinner"></div> : t("group.create_group_chat")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default ModalCreateGroup;
