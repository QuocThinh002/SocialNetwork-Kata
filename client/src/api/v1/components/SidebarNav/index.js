import './sidebarNav.scss'
import { FaHouse, FaMessage, FaGear, FaUserGroup, FaBell, FaGlobe, FaArrowRightFromBracket } from 'react-icons/fa6'
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {path} from '../../utils/constant'
import { signOut } from '../../store/actions/auth.action';

function SidebarNav() {
    const { t, i18n } = useTranslation()
    const [currentLanguage, setCurrentLanguage] = useState('vi')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (!isLoggedIn) navigate(path.LOGIN)
    }, [isLoggedIn])

    const handleSignOut = () => {
        dispatch(signOut());
    }



    return (<>
        <div className='sidebar-nav'>
            <div className="nav-tabs">
                <div>
                    <div className='nav-tabs__avatar'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEnuDpO2_EH3FK8D8r2g3pgpiPw7uuR5AlOg&s' alt='avatar' />
                    </div>

                    <div className='nav-tabs__top'>
                        <span className='tooltip'>
                            <FaHouse size={28} color='white' />
                            <span className='tooltiptext'>{t("navbar.home", {name: 'ok'})}</span>
                        </span>
                        <span className='tooltip'>
                            <FaUserGroup size={28} color='white' />
                            <span className='tooltiptext'>{t("navbar.friends")}</span>
                        </span>
                        <span className='tooltip'>
                            <FaMessage size={28} color='white' />
                            <span className='tooltiptext'>{t("navbar.messages")}</span>
                        </span>
                        <span className='tooltip'>
                            <FaBell size={28} color='white' />
                            <span className='tooltiptext'>{t("navbar.notifications")}</span>
                        </span>
                    </div>
                </div>

                <div className='nav-tabs__bottom'>
                    <button className='language'
                        onClick={() => {
                            setCurrentLanguage(currentLanguage === "en" ? "vi" : "en")
                            i18n.changeLanguage(currentLanguage === "en" ? "vi" : "en")
                        }}
                    >
                        <span className='tooltip'>
                            <FaGlobe size={28} color='white' />
                            <span className='tooltiptext'>{t("navbar.language")}</span>
                        </span>
                    </button>
                    <span className='tooltip' onClick={handleSignOut}>
                        <FaArrowRightFromBracket size={28} color='white' />
                        <span className='tooltiptext'>???dang xuat???</span>
                    </span>
                    <span className='tooltip'>
                        <FaGear size={28} color='white' />
                        <span className='tooltiptext'>{t("navbar.settings")}</span>
                    </span>
                </div>
            </div>
            <div className="sidebar-nav__right-tab">right-tab</div>
        </div>
    </>)
}

export default SidebarNav;