import './convList.scss'
import { useTranslation } from 'react-i18next';
import ContactSearch from '../../components/ContactSearch';
import { useEffect, useState } from 'react';
import ConversationItem from './ConversationItem';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../../socket';
import { getConversationsInfo } from '../../store/actions/chat.action';

function ConvList() {
    const { t } = useTranslation();
    const { convs } = useSelector(state => state.chatReducer);
    const [conversations, setConversations] = useState(convs)
    const [ message, setMessage ] = useState('');
    const dispatch = useDispatch();
    
    // console.log('message::', message)
    // console.log('convs::', convs, '::convs')

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

    return (<>
        <div className="conv-list">
            <ContactSearch />
            <div className="convs">
                {conversations && conversations.length > 0 && conversations.map(conversation => (
                    <ConversationItem conv={conversation} key={conversation._id} />
                ))}
            </div>
        </div>
    </>)
}

export default ConvList;