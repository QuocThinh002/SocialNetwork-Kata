import { Outlet } from 'react-router-dom';


import SidebarNav from '../components/SidebarNav';
import './layoutDefault.scss'


function LayoutDefault() {
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
