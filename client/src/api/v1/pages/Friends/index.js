import ProfileFriend from '../ProfileFriend';
import './friends.scss'
import FriendsList from './friendsList'
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Friends() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const userId = searchParams.get('userId');

    return (<>
        <div className="friends">
            <div className='friends__left'>
                <FriendsList />
            </div>
            {!userId ? <>
                <div className='friends__none-profile'>
                    <p className='friends__none-profile__title'>{t("friends.none-profile")}</p>
                </div>
            </> : <>
                <div className='friends__right'>
                    <ProfileFriend />
                </div>
            </>}
        </div>
    </>)
}

export default Friends;