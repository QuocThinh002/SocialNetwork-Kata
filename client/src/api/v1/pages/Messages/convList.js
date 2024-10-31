import './convList.scss'
import { useTranslation } from 'react-i18next';
import ContactSearch from '../../components/ContactSearch';
import { useCallback, useEffect, useState } from 'react';
import ConversationItem from './ConversationItem';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../../socket';
import { getConversationsInfo } from '../../store/actions/chat.action';
import { FaAngleLeft, FaAngleRight, FaSistrix, FaUsers } from 'react-icons/fa6';
import { debounce } from '../../utils/debounce';
import { removeAccents } from '../../utils/removeAccents';
import ModalCreateGroup from '../../components/ModalCreateGroup';

function ConvList() {
    const { t } = useTranslation();
    const { convs } = useSelector(state => state.chatReducer);
    const [conversations, setConversations] = useState(convs)
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const [isShowLeft, setIsShowLeft] = useState(true);
    const [isCreateGroup, setIsCreateGroup] = useState(false);

    // console.log('message::', message)
    // console.log('convs::', convs, '::convs')

    const handleToggleShow = () => {
        setIsShowLeft(!isShowLeft);
    }

    useEffect(() => {
        dispatch(getConversationsInfo())
    }, [])

    useEffect(() => {
        setConversations(convs)
    }, [convs])



    useEffect(() => {
        const handleMessageReceive = (message) => {
            // console.log('asdf:::::', message)
            setMessage(message)
            const conversations = convs;
            const idx = conversations?.findIndex(conv => (conv._id === message?.conversationId))
            if (idx >= 0 && conversations) {
                conversations[idx].lastMessage = { content: message?.content, senderId: message?.senderId }
                conversations[idx].updatedAt = Date.now();
            }
            const sortedConversations = conversations?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setConversations(sortedConversations)
            // console.log('sort::', sortedConversations)
        };

        socket.on('SERVER_RETURN_MESSAGE', handleMessageReceive);

        // return () => {
        //     socket.off('SERVER_RETURN_MESSAGE');
        // };
    }, [message]);

    // // Hàm tìm kiếm bạn bè với debounce
    // const handleSearchConvs = useCallback(
    //     debounce((value) => {
    //         if (value !== '') {
    //             const regex = new RegExp(removeAccents(value), 'i');
    //             const list = convs.filter(conv => regex.test(removeAccents(conv.name)));
    //             setConversations(list);
    //         } else {
    //             setConversations(convs);
    //         }
    //     }, 300),
    //     [convs]
    // );

    // // // Hàm gọi debounce khi input thay đổi
    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     handleSearchConvs(value);
    // };

    return (<>
        <div className="conv-list">
            {isCreateGroup && <ModalCreateGroup setIsOpenModal={setIsCreateGroup} />}
            <div className={`conv-list__left ` + (isShowLeft ? "" : "none")}>
                
                <div className='conv-list__search'>
                    <div className='conv-list__search__group'>
                        <span><FaSistrix /></span>
                        <input
                            type='text'
                            id='search-convs'
                            name='searchConvs'
                            autoComplete='off'
                            required
                            // onChange={handleChange}
                            placeholder={t("convs.search_convs")}
                        />
                    </div>
                    <span className='conv-list__group' onClick={() => setIsCreateGroup(true)} ><FaUsers /></span>
                </div>
                <div className="convs">
                    {conversations && conversations.length > 0 && conversations.map(conversation => (
                        <ConversationItem conv={conversation} key={conversation._id} />
                    ))}
                </div>
            </div>
            <div className='conv-list__show'>
                <div className='conv-list__show__btn'>
                    {isShowLeft
                        ? <span onClick={handleToggleShow}><FaAngleLeft /></span>
                        : <span onClick={handleToggleShow}><FaAngleRight /></span>
                    }
                </div>
            </div>

        </div>
    </>)
}

export default ConvList;