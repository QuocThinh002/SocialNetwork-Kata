import { FaGlobe, FaArrowRightFromBracket, FaMoon } from 'react-icons/fa6';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';

import './settingModal.scss'
import { signOut } from '../../store/actions/auth.action';


function SettingModal(){
    const { t, i18n } = useTranslation()
    const [currentLanguage, setCurrentLanguage] = useState('vi')
    const dispatch = useDispatch();


    const handleSignOut = () => {
        dispatch(signOut());
    }

    const handleToggleDarkMode = () => {

    }

    return (<>
        <div className='setting-modal'>
            <button className='setting-modal__language'
                onClick={() => {
                    setCurrentLanguage(currentLanguage === "en" ? "vi" : "en")
                    i18n.changeLanguage(currentLanguage === "en" ? "vi" : "en")
                }}
            >
                <span className='setting-modal__item'>
                    <span className='setting-modal__icon'><FaGlobe className='setting-modal__icon' /></span>
                    <span className='setting-modal__item__text'>{t("settings.language")}</span>
                </span>
            </button>
            <button className='setting-modal__dark-mode'>
                <span className='setting-modal__item' onClick={handleToggleDarkMode}>
                    <span className='setting-modal__icon'><FaMoon className='setting-modal__icon' /></span>
                    <span className='setting-modal__item__text'>{t("settings.dark_mode")}</span>
                </span>
            </button>
            <button className='setting-modal__sign-out'  onClick={handleSignOut}>
                <span className='setting-modal__item'>
                    <span className='setting-modal__icon'><FaArrowRightFromBracket  /></span>
                    <span className='setting-modal__item__text'>{t("settings.logout")}</span>
                </span>
            </button>
        </div>
    </>)
}

export default SettingModal;