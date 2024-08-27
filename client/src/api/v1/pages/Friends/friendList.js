import './friendList.scss'

import { useSelector } from 'react-redux';


function FriendList() {
    const { friends } = useSelector(state => state.userReducer)

    return (<>
        <div className="menu-friends">
            {friends?.map(item => (<div key={item}>
                {item}
            </div>))}
        </div>
    </>)
}

export default FriendList;