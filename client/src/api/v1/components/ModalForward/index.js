import { FaXmark } from 'react-icons/fa6';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modalForward.scss';
import { apiMessageForward } from '../../services/chat.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function ModalForward({ setIsOpenModal, messageForward, imagesForward }) {
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
        formData.append('messageForward', messageForward);
        formData.append('imagesForward', imagesForward);
        selectedFriends.forEach((friendId) => {
            formData.append('selectedFriends[]', friendId); // Lưu ý rằng selectedFriends là một mảng
        });

        // console.log("selectedFriends::", selectedFriends)

        try {
            const response = await apiMessageForward(formData);  // Gửi formData thay vì JSON object

            if (response?.data?.success) {
                // toast.success(t("messages.forward_successfully"));
                setIsOpenModal(false);  // Đóng modal khi thành công
            } else {
                // toast.error(t("message.forward_fail"));
            }
        } catch (error) {
            // console.error('Error while creating group:', error);
            // toast.error('An error occurred while creating the group');
        } finally {
            setIsLoading(false); // Set loading to false once the request is complete
            setIsOpenModal(false);
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

                    <h2 className='modal__title'>{t("messages.forward")}</h2>
                    <form onSubmit={handleSubmit} className="form-forward">
                        {friends?.length > 0 && (
                            <div className='form-forward__select-friends'>
                                <div className='form-forward__head'>
                                    {messageForward}
                                </div>
                                {friends.map(friend => (
                                    <div className='form-forward__friend-item' key={friend._id}>
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

                        <div className='form-forward__submit'>
                            <span onClick={() => !isLoading && setIsOpenModal(false)} className='btn btn__cancel' disabled={isLoading}>{t("group.cancel")}</span>
                            <button type="submit" className='btn btn__submit' disabled={isLoading}>
                                {isLoading ? <div className="spinner"></div> : t("messages.forward")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default ModalForward;
