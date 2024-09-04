import './profileFriend.scss'
import { useEffect, useState } from 'react';
import { FaMessage } from 'react-icons/fa6';
import { useTranslation } from "react-i18next";
import { useSearchParams } from 'react-router-dom';
import { apiGetUser } from '../../services/user.services';

function ProfileFriend() {
    const { t } = useTranslation();    
    const [searchParams, setSearchParams] = useSearchParams()
    const userId = searchParams.get('userId');
    const [user, setUser] = useState();


    useEffect(() => {
        const func = async () => {
            const response = await apiGetUser(userId);
            const data = response?.data?.user
            setUser(data)
        }
        func();
    }, [userId])


    return (<>
        <div className='container'>
            <div className="profile-friend">
                <div className='profile-friend__head'>
                    <div className='profile-friend__cover-photo'>
                    <img src={user?.coverPhoto|| `${window.location.origin}/assets/image/sky.jpg`} alt='cover photo' />
                    </div>
                    <div className='profile-friend__box'  >
                        <div className="profile-friend__avatar">
                        <img src={user?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`} alt='profile picture' />
                        </div>
                        <div className='profile-friend__box-center'>
                            <h2 className='profile-friend__box-center__name'>{user?.name}</h2>
                            <span className='profile-friend__box-center__friends'>{user?.friends?.length} {t("profile.friends")}</span>
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
                            <button className='btn btn--color profile-friend__box-right__btn'><FaMessage /><span className='profile-friend__box-right__text'>{t("profile.message")}</span></button>
                        </div>
                    </div>
                </div>
                {user?.bio && <div className='profile-friend__box-bio'>
                    <p>{user?.bio}</p>
                </div>}
            </div>
        </div>
    </>)
}

export default ProfileFriend;