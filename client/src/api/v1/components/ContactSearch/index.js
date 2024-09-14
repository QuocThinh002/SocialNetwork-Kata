import './contactSearch.scss'

import { FaUserPlus, FaSistrix } from 'react-icons/fa6';
import { MdGroupAdd } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { apiSearchUser } from '../../services/user.services';

function ContactSearch() {
    const { t } = useTranslation();
    const [user, setUser] = useState();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Ngăn gửi form mặc định
        const func = async () => {
            console.log('search::', searchQuery)
            const response = await apiSearchUser(searchQuery);
            const data = response?.data?.user;
            console.log('data:', data)
            setUser(data)
        }

        func()
    };

    return (<>
        <div>
            <div className="contact-search">
                <form className="contact-search" onSubmit={handleSearchSubmit}>
                    <div className="contact-search__group">
                        <span><FaSistrix /></span>
                        <input
                            type="text"
                            className="form__input"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </form>
                <div className='tooltip' onClick={() => alert('add friends')}>
                    <FaUserPlus className='contact-search__icon' />
                    <span className='tooltip__text'>{t("messages.add_friend")}</span>
                </div>

                <div className='tooltip' onClick={() => alert('create group')}>
                    <MdGroupAdd className='contact-search__icon' />
                    <span className='tooltip__text'>{t("messages.create_group_chat")}</span>
                </div>
            </div>

            {user && <div className='show-search'>
                <div className='show-item'>
                    <div className='show-item__image'><img src={user?.profilePicture} /></div>
                    <div className='show-item__name'>{user?.name}</div>
                    
                </div>
            </div>}
        </div>
    </>)
}

export default ContactSearch;