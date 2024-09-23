import './contactSearch.scss'

import { FaUserPlus, FaSistrix } from 'react-icons/fa6';
import { MdGroupAdd } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { apiSearchUser } from '../../services/user.service';
import UserItem from '../UserItem';
import ModalCreateGroup from '../ModelCreateGroup';

function ContactSearch() {
    const { t } = useTranslation();
    const [user, setUser] = useState();
    const [showModalCreateGroup, setShowModelCreateGroup] = useState(false);
    // console.log('user::', user)

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

    const handleCreateGroup = () => {
        setShowModelCreateGroup(true);
    }

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

                <div className='tooltip' onClick={handleCreateGroup}>
                    <MdGroupAdd className='contact-search__icon' />
                    <span className='tooltip__text'>{t("messages.create_group_chat")}</span>
                </div>
            </div>

            {user ? <div className='show-search'>
                <UserItem friend={user} />
            </div> : <div>
                Khong tim thay ket qua
            </div>}
        </div>
        {showModalCreateGroup && <ModalCreateGroup setIsOpenModal={setShowModelCreateGroup} />}
    </>)
}

export default ContactSearch;