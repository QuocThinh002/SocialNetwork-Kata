import { useSearchParams } from 'react-router-dom';
import './conversationItem.scss'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function ConversationItem(props) {
    const { conv } = props;
    const { user } = useSelector(state => state.userReducer);
    const [searchParams, setSearchParams] = useSearchParams()
    const convId = searchParams.get('convId');
    const members = conv?.members || [];
    const convAvtFriend = conv && (user?.userId === members[0]?.userId ? members[1]?.profilePicture : members[0]?.profilePicture)
    const convNameFriend = conv && (user?.userId === members[0]?.userId ? members[1]?.name : members[0]?.name)

    // console.log(conv)
    
    const handleClickConv = () => {
        setSearchParams({ convId: conv._id })
    }

    return (<>
        <div onClick={handleClickConv} className={'conv-item ' + (convId === conv._id ? 'chatting' : '')}>
            <div className='conv-item__image'>
                {conv?.isGroup ? <>
                    {conv?.avatar ? <img src={conv?.avatar} /> : <>
                        {members?.map(item => <img src={item.profilePicture} />)}
                    </>}
                </> : <>
                    <img src={convAvtFriend} />
                </>}
            </div>
            <div className='conv-item__right'>
                <div className='conv-item__name'>{conv?.isGroup ? conv?.name : convNameFriend}</div>
                <p className='conv-item__last-msg'>{conv?.lastMessage?.content}</p>
            </div>
        </div>
    </>)
}

export default ConversationItem;