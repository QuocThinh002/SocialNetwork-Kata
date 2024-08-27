import './friends.scss'
import FriendList from './friendList'
import MenuFriends from './menuFriends'

function Friends() {
    return (<>
        <div className="friends">
            <MenuFriends />
            <FriendList />
        </div>
    </>)
}

export default Friends;