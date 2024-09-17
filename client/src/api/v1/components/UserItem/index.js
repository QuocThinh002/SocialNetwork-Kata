import { useEffect, useState } from 'react';
import './userItem.scss'
import { useSelector } from 'react-redux';
import { apiAddFriend, apiCancelAddFriend, apiGetFriendRequests } from '../../services/user.services';
import { useSearchParams } from 'react-router-dom';

function UserItem(props) {
    const { friend } = props;
    const { user } = useSelector(state => state.userReducer);
    const idxFriend = user.friends.findIndex(friendId => friendId === friend._id)
    const [friendRequests, setFriendRequests] = useState([]);
    const [sentFriendRequests, setSentFriendRequests] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isAddFriend, setIsAddFriend] = useState(true);
    const [isConfirm, setIsConfirm] = useState(false);

    useEffect(() => {
        const func = async () => {
            const response = await apiGetFriendRequests();
            const toUser = response?.data?.friendRequests || [];
            const fromUser = response?.data?.sentFriendRequests || [];
            setFriendRequests(toUser)
            setSentFriendRequests(fromUser)
        }
        func()
    }, [])

    useEffect(() => {
        setIsAddFriend(sentFriendRequests.findIndex(item => item.toUser === friend._id))
    }, [sentFriendRequests])

    useEffect(() => {
        setIsConfirm(friendRequests.findIndex(item => item.fromUser === friend._id) !== -1)
    }, [friendRequests])

    const handleAddFriend = () => {
        apiAddFriend({ friendId: friend._id })
        setIsAddFriend(false)
    }

    const handleCacelAddFriend = () => {
        apiCancelAddFriend({ friendId: friend._id })
        setIsAddFriend(true)
    }

    const hanldeClickFriend = (friend) => {
        setSearchParams({ userId: friend._id })
    }

    return (<>
        <div className='user-item' onClick={() => hanldeClickFriend(friend)}>
            <div className='user-item__image'><img src={friend?.profilePicture} /></div>
            <div className='user-item__name'>{friend?.name}</div>
            <div className='user-item__right'>
                {idxFriend === -1 && <>
                    {isConfirm ? <div>
                        <button onClick={handleAddFriend}>confirm</button>
                        {/* <button>delete</button> */}
                    </div> : <div>
                        {isAddFriend
                            ? <button onClick={handleAddFriend}>add_friend</button>
                            : <button onClick={handleCacelAddFriend}>cancel_add_friend</button>
                        }
                        {/* <button>remove</button> */}
                    </div>}
                </>}
            </div>
        </div>
    </>)
}

export default UserItem;