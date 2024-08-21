import { Outlet } from 'react-router-dom';

import SidebarNav from '../components/SidebarNav';
import './layoutDefault.scss'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMe } from '../store/actions/user.action';
import { useTranslation } from "react-i18next";


function LayoutDefault() {
  const { isLoggedIn} = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { language, user } = useSelector(state => state.userReducer);

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, isLoggedIn)
  
  
  useEffect(() => {
    dispatch(getMe());
  }, [])

  useEffect(() => {
    console.log('user::', user)
    console.log('language::', language)
    i18n.changeLanguage(language)
  }, [language])

  return (
    <>
      <div className='layout-default'>
        <SidebarNav />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default LayoutDefault;
