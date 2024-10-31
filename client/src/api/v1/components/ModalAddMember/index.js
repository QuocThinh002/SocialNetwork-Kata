import { FaXmark } from 'react-icons/fa6';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modalAddMember.scss';
import { apiAddMembersGroupChat } from '../../services/chat.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getConversationsInfo } from '../../store/actions/chat.action';

function ModalAddMember({ setIsOpenModal, conv, memberList }) {
    const { t } = useTranslation();
    const { friends } = useSelector(state => state.userReducer);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true when starting the request

        const formData = new FormData();
        formData.append('convId', conv?._id);
        selectedFriends.forEach((friendId) => {
            formData.append('selectedFriends[]', friendId); // Lưu ý rằng selectedFriends là một mảng
        });

        // console.log('convId', conv?._id)
        // console.log('selectedFirnd::', selectedFriends)

        try {
            const response = await apiAddMembersGroupChat(formData);  // Gửi formData thay vì JSON object

            if (response?.data?.success) {
                window.location.reload();
                setIsOpenModal(false);  // Đóng modal khi thành công
            } else {
                toast.error(t("group.add_member_fail"));
            }
        } catch (error) {
            console.error('Error while creating group:', error);
            toast.error('An error occurred while creating the group');
        } finally {
            setIsLoading(false); // Set loading to false once the request is complete
        }
    };

    const handleFriendSelection = (friendId) => {
        setSelectedFriends(prev =>
            prev.includes(friendId)
                ? prev.filter(id => id !== friendId)
                : [...prev, friendId]
        );
    };

    // console.log("firnd:::", friends)
    // console.log("memberList:::", memberList)

    return (
        <>
            <div className={`modal  ${isLoading ? 'modal--disabled' : ''}`}>
                <div className={`modal__box`}>
                    <button onClick={() => !isLoading && setIsOpenModal(false)} className="btn modal__close" disabled={isLoading}>
                        <FaXmark />
                    </button>

                    <h2 className='modal__title'>{t("group.add_member")}</h2>
                    <form onSubmit={handleSubmit} className="form-add-member">
                        <div className='form-add-member__head'>
                            <div className='form-add-member__avatar'>
                                <img src={conv?.avatar} alt='avt' />
                            </div>
                            <span>{conv?.name}</span>
                        </div>
                        

                        {friends?.length > 0 && (
                            <div className='form-add-member__select-friends'>
                                {friends.map(friend => {
                                    {
                                        if (memberList.findIndex(member => member._id == friend._id) != -1) return null;
                                        
                                        return <>
                                            < div className='form-add-member__friend-item' key={friend._id} >
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
                                        </>
                                    }
                                })}
                            </div>
                        )}

                        <div className='form-add-member__submit'>
                            <span onClick={() => !isLoading && setIsOpenModal(false)} className='btn btn__cancel' disabled={isLoading}>{t("group.cancel")}</span>
                            <button type="submit" className='btn btn__submit' disabled={isLoading}>
                                {isLoading ? <div className="spinner"></div> : t("group.add_member")}
                            </button>
                        </div>
                    </form>
                </div >
            </div >

            <ToastContainer />
        </>
    );
}

export default ModalAddMember;
