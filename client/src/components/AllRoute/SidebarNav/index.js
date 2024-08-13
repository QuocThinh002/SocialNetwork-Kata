import './sidebarNav.scss'
import {FaHouse, FaMessage, FaGear, FaUserGroup, FaBell} from 'react-icons/fa6'

function SidebarNav() {

    return (<>
        <div className='sidebar-nav'>
            <div className="nav-tabs">
                <div>
                    <div className='nav-tabs__avatar'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEnuDpO2_EH3FK8D8r2g3pgpiPw7uuR5AlOg&s' alt='avatar' />
                    </div>
    
                    <div className='nav-tabs__top'>
                        <span><FaHouse size={28} color='white'/></span>
                        <span><FaUserGroup size={28} color='white' /></span>
                        <span>
                            <FaMessage size={28} color='white' />
                        </span>
                        <span>
                            <FaBell size={28} color='white' />
                        </span>
                    </div>
                </div>

                <div className='nav-tabs__bottom'>
                    <span><FaGear size={28} color='white'/></span>
                </div>
            </div>
            <div className="sidebar-nav__right-tab">right-tab</div>
      </div>
    </>)
}

export default SidebarNav;