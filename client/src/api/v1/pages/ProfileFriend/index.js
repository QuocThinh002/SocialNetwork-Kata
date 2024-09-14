import './profileFriend.scss'
import { useEffect, useState } from 'react';
import { FaMessage } from 'react-icons/fa6';
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiGetUser } from '../../services/user.services';
import { apiGetCreateConv, apiGetConversation } from '../../services/chat.services';

function ProfileFriend() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const friendId = searchParams.get('userId');
    const [friend, setFriend] = useState();
    const { user } = useSelector(state => state.userReducer);

    useEffect(() => {
        const func = async () => {
            const response = await apiGetUser(friendId);
            const data = response?.data?.user
            setFriend(data)
        }
        func();
    }, [friendId])


    const handleMessage = () => {
        const func = async () => {
            let conversationId = user.friends.find(friend => friend?.userId === friendId)?.conversationId;
            if (!conversationId) {
                const response = await apiGetCreateConv(friendId)
                console.log('response:::', response)
                conversationId = response?.data?.conversationId
            }
            // alert(conversationId)
            if (conversationId) {
                navigate(`/messages?convId=${conversationId}`)
            }
        }
        func();
    }
    return (<>
        <div className='container'>
            <div className="profile-friend">
                <div className='profile-friend__head'>
                    <div className='profile-friend__cover-photo'>
                        <img src={friend?.coverPhoto || `${window.location.origin}/assets/image/sky.jpg`} alt='cover photo' />
                    </div>
                    <div className='profile-friend__box'  >
                        <div className="profile-friend__avatar">
                            <img src={friend?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`} alt='profile picture' />
                        </div>
                        <div className='profile-friend__box-center'>
                            <h2 className='profile-friend__box-center__name'>{friend?.name}</h2>
                            <span className='profile-friend__box-center__friends'>{friend?.friends?.length} {t("profile.friends")}</span>
                            <div className='profile-friend__box-center__friends-img'>
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                            </div>
                        </div>
                        <div className='profile-friend__box-right'>
                            <button className='btn profile-friend__box-right__btn btn__friend'><FaMessage /><span className='profile-friend__box-right__text'>hi hello</span></button>
                            <button onClick={handleMessage} className='btn btn--color profile-friend__box-right__btn btn__msg'><FaMessage /><span className='profile-friend__box-right__text'>{t("profile.message")}</span></button>
                        </div>
                    </div>
                </div>
                {friend?.bio && <div className='profile-friend__box-bio'>
                    <p>{friend?.bio}</p>
                </div>}
            </div>
        </div>
    </>)
}

export default ProfileFriend;