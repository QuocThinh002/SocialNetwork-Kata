import ContactSearch from '../../components/ContactSearch';
import './friendsList.scss';
import { FaSistrix, FaUserGroup } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { removeAccents } from '../../utils/removeAccents';
import { debounce } from '../../utils/debounce';


function FriendsList() {
    const { friends } = useSelector(state => state.userReducer)
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams()
    const [friendList, setFriendList] = useState(friends);

    useEffect(() => {
        setFriendList(friends);
    }, [friends])

    // console.log('friends list', friendList)

    const handleClickFriend = (friend) => {
        setSearchParams({ userId: friend._id })

    }

    // Hàm tìm kiếm bạn bè với debounce
    const handleSearchFriends = useCallback(
        debounce((value) => {
            if (value !== '') {
                const regex = new RegExp(value, 'i');
                const list = friends.filter(friend => regex.test(removeAccents(friend.name)));
                setFriendList(list);
            } else {
                setFriendList(friends);
            }
        }, 300),
        [friends]
    );

    // Hàm gọi debounce khi input thay đổi
    const handleChange = (e) => {
        const value = e.target.value;
        handleSearchFriends(value);
    };


    // console.log(friends)
    return (<>
        <div className="friends-list">

            <div className='friends-list__title'>
                <FaUserGroup />
                {t("friends.friends_list")}
            </div>

            <div className='friends-list__search'>
                <div className='friends-list__search__group'>
                    <span><FaSistrix /></span>
                    <input
                        type='text'
                        id='search-friends'
                        name='searchFriends'
                        autoComplete='off'
                        required
                        onChange={handleChange}
                        placeholder={t("friends.search_friends")}
                    />
                </div>
            </div>

            <div className='friends-list__card'>
                <span>{t("friends.friends")} ({friends?.length || 0})</span>

                {friendList?.length > 0 ? friendList?.map(friend => (<div
                    key={friend?._id}
                    className='friends-list__item'
                    onClick={() => handleClickFriend(friend)}
                >
                    <div className='friends-list__item__image'>
                        <img src={friend?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`} />
                    </div>
                    <div className='friends-list__item__name'>{friend?.name}</div>
                </div>)) : <div>
                    {t("friends.not_found")}
                </div>}
            </div>

        </div>
    </>)
}

export default FriendsList;