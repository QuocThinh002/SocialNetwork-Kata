import { FaGlobe, FaArrowRightFromBracket, FaMoon, FaSun } from 'react-icons/fa6';
import { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../store/actions/auth.action'
import './settingModal.scss'
import { updateUser } from '../../store/actions/user.action';

import { ThemeContext } from '../../../../themeContext';


function SettingModal() {
    const { t, i18n } = useTranslation()
    const { user } = useSelector(state => state.userReducer);
    const [currentLanguage, setCurrentLanguage] = useState(user?.language)
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleSignOut = async () => {
        dispatch(signOut())
    }

    const handleToggleDarkMode = () => {

    }

    const handleChangeLanguage = () => {
        const newLang = currentLanguage === "en" ? "vi" : "en";
        setCurrentLanguage(newLang)
        i18n.changeLanguage(newLang)
        dispatch(updateUser({ language: newLang }));
        console.log('::language::', { language: newLang })
    }

    return (<>
        <div className='setting-modal'>
            <button className='setting-modal__language'
                onClick={handleChangeLanguage}
            >
                <span className='setting-modal__item'>
                    <span className='setting-modal__icon'><FaGlobe className='setting-modal__icon' /></span>
                    <span className='setting-modal__item__text'>{t("settings.language")}</span>
                </span>
            </button>
            <button onClick={toggleTheme} className='setting-modal__dark-mode'>
                <span className='setting-modal__item' onClick={handleToggleDarkMode}>
                    <span className='setting-modal__icon'>{theme == 'light' ? <FaMoon className='setting-modal__icon' /> : <FaSun className='setting-modal__icon' />}</span>
                    <span className='setting-modal__item__text'>{theme == 'light' ? t("settings.dark_mode"):t("settings.light_mode")}</span>

                </span>
            </button>
            <button className='setting-modal__sign-out' onClick={handleSignOut}>
                <span className='setting-modal__item'>
                    <span className='setting-modal__icon'><FaArrowRightFromBracket /></span>
                    <span className='setting-modal__item__text'>{t("settings.logout")}</span>
                </span>
            </button>
        </div>
    </>)
}

export default SettingModal;