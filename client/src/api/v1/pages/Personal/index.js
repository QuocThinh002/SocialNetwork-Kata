import './personal.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react';

import { FaPen } from 'react-icons/fa6';
import ModalEditPersonal from '../../components/ModalEditPersonal';

import { useTranslation } from "react-i18next";


function Personal() {
    const { t } = useTranslation();
    // const { isLoggedIn } = useSelector(state => state.authReducer);
    const { user } = useSelector(state => state.userReducer);
    const [ isOpenModal, setIsOpenModal ] = useState(false);
    // console.log({isLoggedIn, user})

    const handleOpenModalEdit = () => {
        setIsOpenModal(true);
    }


    return (<>
        <div className='container'>
            <div className="personal">
                <div className='personal__head'>
                    <div className='personal__cover-photo'>
                    <img src={user?.coverPhoto|| `${window.location.origin}/assets/image/sky.jpg`} alt='cover photo' />
                    </div>
                    <div className='personal__box'  >
                        <div className="personal__avatar">
                        <img src={user?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`} alt='profile picture' />
                        </div>
                        <div className='personal__box-center'>
                            <h2 className='personal__box-center__name'>{user?.name}</h2>
                            <span className='personal__box-center__friends'>{user?.friends?.length} {t("profile.friends")}</span>
                            <div className='personal__box-center__friends-img'>
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                                <img src={`${window.location.origin}/assets/image/sky.jpg`} alt='friend' />
                            </div>
                        </div>
                        <div className='personal__box-right'>
                            <button onClick={handleOpenModalEdit} className='btn personal__box-right__btn'><FaPen /><span className='personal__box-right__text'>{t("profile.edit_profile")}</span></button>
                        </div>
                    </div>
                </div>
                {user?.bio && <div className='personal__box-bio'>
                    <p>{user?.bio}</p>
                </div>}
            </div>
        </div>
        {isOpenModal && <ModalEditPersonal setIsOpenModal={setIsOpenModal} />}
    </>)
}

export default Personal;