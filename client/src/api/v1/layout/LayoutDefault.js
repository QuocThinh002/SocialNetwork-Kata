import { Outlet } from 'react-router-dom';

import SidebarNav from '../components/SidebarNav';
import './layoutDefault.scss'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMe, getFriends } from '../store/actions/user.action';
import { useTranslation } from "react-i18next";



function LayoutDefault() {
  const { isLoggedIn } = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { language, user } = useSelector(state => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, isLoggedIn)


  useEffect(() => {
    const func = async () => {
      await dispatch(getMe());
      setIsLoading(false)
      await dispatch(getFriends());
    }
    func()
  }, [])

  useEffect(() => {
    console.log('user::', user)
    console.log('language::', language)
    console.log('theme::', user?.theme)
    i18n.changeLanguage(language)
    if (user?.theme) localStorage.setItem('theme', user?.theme);
  }, [language])

  return (
    <>
      <div className='layout-default'>
        {isLoading ? <>
          <div className='loading'>
            isLoading
          </div>
        </> : <>
          <SidebarNav />
          <main className="main">
              <Outlet />
          </main>
        </>}

      </div>
    </>
  );
}

export default LayoutDefault;
