import './profileFriend.scss';
import { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaMessage, FaUserLargeSlash } from 'react-icons/fa6';
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiAddFriend, apiCancelAddFriend, apiGetUser, apiUnfriend, apiGetFriendRequests } from '../../services/user.service';
import { apiGetCreateConv } from '../../services/chat.service';
import { path } from '../../utils/constant';

function ProfileFriend() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const friendId = searchParams.get('userId');
    const { user, friends } = useSelector(state => state.userReducer);

    const [friend, setFriend] = useState();
    const [mutualFriends, setMutualFriends] = useState([]);
    const [isFriend, setIsFriend] = useState(false);
    const [isAddFriend, setIsAddFriend] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

    useEffect(() => {
        const fetchFriendData = async () => {
            if (user?._id === friendId) navigate('/' + path.PERSONAL);

            const response = await apiGetUser(friendId);
            const data = response?.data?.user;
            const mutual = response?.data?.mutualFriends;

            setFriend(data);
            setMutualFriends(mutual);

            // Kiểm tra xem có phải bạn bè không
            const isFriendCheck = friends.some(f => f._id === friendId);
            setIsFriend(isFriendCheck);

            // Lấy danh sách yêu cầu kết bạn
            const friendRequestsResponse = await apiGetFriendRequests();
            const toUser = friendRequestsResponse?.data?.friendRequests || [];
            const fromUser = friendRequestsResponse?.data?.sentFriendRequests || [];

            // Kiểm tra trạng thái yêu cầu kết bạn
            setIsConfirm(toUser.some(request => request.fromUser === friendId));  // Người kia gửi yêu cầu
            setIsAddFriend(fromUser.some(request => request.toUser === friendId)); // Mình đã gửi yêu cầu
        };

        fetchFriendData();
    }, [friendId, user, friends]);

    const handleAddFriend = async () => {
        // console.log('friendId::: ', friendId)
        await apiAddFriend({ friendId });
        
        if (isConfirm) setIsFriend(true)
        else setIsAddFriend(true);  
    };

    const handleCancelAddFriend = async () => {
        await apiCancelAddFriend({ friendId });
        setIsAddFriend(false);  
    };

    const handleUnfriend = async () => {
        await apiUnfriend({ friendId });
        setIsFriend(false);  
    };

    const handleMessage = async () => {
        let conversationId = user.friends.find(f => f?.userId === friendId)?.conversationId;
        if (!conversationId) {
            const response = await apiGetCreateConv(friendId);
            conversationId = response?.data?.conversationId;
        }
        if (conversationId) navigate(`/messages?convId=${conversationId}`);
    };

    const profilePictureUser = (userId) => {
        const user = friends?.find(f => f._id === userId);
        return user?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`;
    };

    return (
        <div className='container'>
            <div className="profile-friend">
                <div className='profile-friend__head'>
                    <div className='profile-friend__cover-photo'>
                        <img src={friend?.coverPhoto || `${window.location.origin}/assets/image/sky.jpg`} alt='cover photo' />
                    </div>
                    <div className='profile-friend__box'>
                        <div className="profile-friend__avatar">
                            <img src={friend?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`} alt='profile picture' />
                        </div>
                        <div className='profile-friend__box-center'>
                            <h2 className='profile-friend__box-center__name'>{friend?.name}</h2>
                            <span className='profile-friend__box-center__friends'>{t("profile.mutual_friends", { number: mutualFriends?.length || 0 })}</span>
                            {mutualFriends?.length > 0 && (
                                <div className='profile-friend__box-center__friends-img'>
                                    {mutualFriends.slice(0, 6).map(mf => (
                                        <img key={mf} src={profilePictureUser(mf)} alt='friend' />
                                    ))}
                                    {mutualFriends.length > 6 && (
                                        <span
                                            className='profile-friend__box-center__ellipsis'
                                            style={{ backgroundImage: `url(${profilePictureUser(mutualFriends[6])})` }}
                                        >
                                            <HiDotsHorizontal />
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='profile-friend__box-right'>
                            {isFriend ? (
                                <button className='btn profile-friend__box-right__btn btn__unfriend' onClick={handleUnfriend}>
                                    <FaUserLargeSlash />
                                    <span className='profile-friend__box-right__text'>{t("profile.unfriend")}</span>
                                </button>
                            ) : isConfirm ? (
                                <button onClick={handleAddFriend} className='btn'>{t("friends.confirm")}</button>
                            ) : isAddFriend ? (
                                <button onClick={handleCancelAddFriend} className='btn'>{t("friends.cancel_friend")}</button>
                            ) : (
                                <button onClick={handleAddFriend} className='btn'>{t("friends.add_friend")}</button>
                            )}

                            <button onClick={handleMessage} className='btn btn--color profile-friend__box-right__btn btn__msg'>
                                <FaMessage />
                                <span className='profile-friend__box-right__text'>{t("profile.message")}</span>
                            </button>
                        </div>
                    </div>
                </div>
                {friend?.bio && (
                    <div className='profile-friend__box-bio'>
                        <pre>{friend?.bio}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileFriend;
