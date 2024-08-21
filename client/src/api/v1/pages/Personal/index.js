import './personal.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react';

import { FaPen } from 'react-icons/fa6';
import ModalEditPersonal from '../../components/ModalEditPersonal';

import { useTranslation } from "react-i18next";


function Personal() {
    const { t } = useTranslation();
    const { isLoggedIn } = useSelector(state => state.authReducer);
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
                        <div className='personal__box-right'>
                            <h2 className='personal__box-right__name'>{user?.name}</h2>
                            <span className='personal__box-right__friends'>{user?.friends?.length} friends</span>
                            <div className='personal__box-right__friends-img'>
                                <img src='https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-6/375678441_324992426723499_4564241413214117071_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=4wdQNhJwwTwQ7kNvgHGt06V&_nc_ht=scontent.fvca1-4.fna&oh=00_AYBfg4-WDUl0IdKWwX-YnO2NcvCnyzgsvL46zdpExTB0KA&oe=66C89838' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <img src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/431769001_439182608637813_7004122701510622393_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IXELCNP4RCEQ7kNvgHfWTKK&_nc_ht=scontent.fvca1-1.fna&oh=00_AYAHIvzoVySaj00SUlKwpFOj9UV2ELWeKzUUxBHUxef-KQ&oe=66C877EC' alt='img-friend' />
                                <h1>dung toastr, loading, skeleton</h1>
                            </div>
                        </div>
                        <div className='edit-personal'>
                            <button onClick={handleOpenModalEdit} className='btn edit-personal__btn'><FaPen /><span className='edit-personal__text'>{t("personal.edit_profile")}</span></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        {isOpenModal && <ModalEditPersonal setIsOpenModal={setIsOpenModal} />}
    </>)
}

export default Personal;