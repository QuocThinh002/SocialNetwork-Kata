import ContactSearch from '../../components/ContactSearch';
import './friendsList.scss';
import { FaUserGroup } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom';


function FriendsList() {
    const { friends } = useSelector(state => state.userReducer)
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams()

    const hanldeClickFriend = (friend) => {
        setSearchParams({userId: friend._id})
    }

    console.log(friends)
    return (<>
        <div className="friends-list">

            <div className='friends-list__title'>
                <FaUserGroup />
                {t("friends.friends_list")}
            </div>
            
            <ContactSearch />
            <div className='friends-list__card'>
                <h3>{t("friends.friends")} ({friends?.length || 0})</h3>
                <div className='friends-list__search'>
                    search hear...
                </div>

                {friends?.map(friend => (<div
                    key={friend._id}
                    className='friends-list__item'
                    onClick={() => hanldeClickFriend(friend)}
                >
                    <div className='friends-list__item__image'>
                        <img src={friend?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`} />
                    </div>
                    <div className='friends-list__item__name'>{friend.name}</div>
                </div>))}
            </div>

        </div>
    </>)
}

export default FriendsList;