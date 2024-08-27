import './sidebarNav.scss'
import { FaGear, FaHouse, FaMessage, FaUserGroup, FaBell } from 'react-icons/fa6'
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from "react-i18next";


import { path } from '../../utils/constant';
import SettingModal from '../SettingModal';

function SidebarNav() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isLoggedIn} = useSelector(state => state.authReducer);
    const { user } = useSelector(state => state.userReducer);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsSettingOpen(false);
        }
    };

    const handleToggleSettings = () => {
        setIsSettingOpen(!isSettingOpen);
    }


    

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown',
                handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!isLoggedIn) navigate('/login')
    }, [isLoggedIn])






    return (<>
        <div className="sidebar-nav">
            <div>
                <div className='sidebar-nav__avatar' onClick={() => navigate(`/${path.PERSONAL}`)}>
                    <img src={user?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`} alt='avatar' />
                </div>

                <div className='sidebar-nav__top'>
                    <div className='tooltip'  onClick={() => navigate(`/${path.FEED}`)}>
                        <FaHouse className="sidebar-nav__icon" />
                        <span className='tooltip__text'>{t("navbar.home")}</span>
                    </div>
                    <div className='tooltip' onClick={() => navigate(`/${path.FRIENDS}`)}>
                        <FaUserGroup className="sidebar-nav__icon" />
                        <span className='tooltip__text'>{t("navbar.friends")}</span>
                    </div>
                    <div className='tooltip'  onClick={() => navigate(`/${path.MESSAGES}`)}>
                        <FaMessage className="sidebar-nav__icon" />
                        <span className='tooltip__text'>{t("navbar.messages")}</span>
                    </div>
                    <div className='tooltip'>
                        <FaBell className="sidebar-nav__icon" />
                        <span className='tooltip__text'>{t("navbar.notifications")}</span>
                    </div>
                </div>
            </div>

            <div className='sidebar-nav__bottom'>


                <div ref={modalRef} className='setting-box'>
                    <div className='tooltip'
                        onClick={handleToggleSettings}
                    >
                        <FaGear className='sidebar-nav__icon' />
                        <span className='tooltip__text'>{t("navbar.settings")}</span>

                    </div>
                    {isSettingOpen && <div className='setting-box__open'><SettingModal /></div>}
                </div>

            </div>
        </div>
    </>)
}

export default SidebarNav;