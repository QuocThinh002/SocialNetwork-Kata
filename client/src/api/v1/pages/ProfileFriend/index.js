import './profileFriend.scss'
import { useEffect, useRef, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaMessage, FaUserGroup } from 'react-icons/fa6';
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiGetUser } from '../../services/user.service';
import { apiGetCreateConv, apiGetConversation } from '../../services/chat.service';
import { path } from '../../utils/constant';

function ProfileFriend() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const friendId = searchParams.get('userId');
    const [friend, setFriend] = useState();
    const { user, friends } = useSelector(state => state.userReducer);
    const [mutualFriends, setMutualFriends] = useState([]);
    // const [isFriends, setisFriends] = useState(false);
    const isFriends = friends.findIndex(friend => friend._id === friendId) != -1;

    // console.log(user)
    // console.log(friend)
    // console.log(mutualFriends)

    const handleUnfriend = async () => {
        const response = await apiUnfriend(friendId);;;;;;;;;;;;;;
    }


    useEffect(() => {
        const func = async () => {
            if (user?._id === friendId) navigate('/' + path.PERSONAL)
            const response = await apiGetUser(friendId);
            const data = response?.data?.user
            const mutual = response?.data?.mutualFriends

            setFriend(data)
            setMutualFriends(mutual)
        }
        func();
    }, [friendId, user])

    // console.log('friends:::', friends)

    const profilePictureUser = (userId) => {
        const user = friends?.filter(friend => friend?._id === userId)
        // console.log('uesr::', user)
        return user[0]?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`
    }


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
                            <span className='profile-friend__box-center__friends'>{t("profile.mutual_friends", { number: mutualFriends?.length || 0 })}</span>
                            {mutualFriends?.length > 0 && <div className='profile-friend__box-center__friends-img'>
                                {mutualFriends?.slice(0, 6).map(mf => <img src={profilePictureUser(mf)} alt='friend' />)}
                                {mutualFriends?.length > 6 && <span
                                    className='profile-friend__box-center__ellipsis'
                                    style={{ backgroundImage: `url(${profilePictureUser(mutualFriends[6])})` }}  // Đảm bảo truy xuất đúng userId
                                >
                                    <HiDotsHorizontal />
                                </span>}
                            </div>}
                        </div>
                        <div className='profile-friend__box-right'>
                            {isFriends
                                ? <>
                                    <button className='btn profile-friend__box-right__btn btn__unfriend' onClick={handleUnfriend}>
                                        <FaUserGroup />
                                        <span className='profile-friend__box-right__text'>{t("profile.unfriend")}</span>
                                    </button>
                                </> : <>
                                    <button className='btn profile-friend__box-right__btn btn__friend'>
                                        <FaMessage />
                                        <span className='profile-friend__box-right__text'>{t("profile.add_friends")}</span>
                                    </button>
                                </>
                            }

                            <button onClick={handleMessage} className='btn btn--color profile-friend__box-right__btn btn__msg'>
                                <FaMessage />
                                <span className='profile-friend__box-right__text'>{t("profile.message")}</span>
                            </button>
                        </div>
                    </div>
                </div>
                {friend?.bio && <div className='profile-friend__box-bio'>
                    <pre>{friend?.bio}</pre>
                </div>}
            </div>
        </div >
    </>)
}

export default ProfileFriend;