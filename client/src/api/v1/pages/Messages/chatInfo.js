
import { useTranslation } from 'react-i18next';
import './chatInfo.scss'
import { useState } from 'react';
import { FaAngleDown, FaAngleUp, FaPlus } from 'react-icons/fa6';
import ModalAddMember from '../../components/ModalAddMember';


function ChatInfo(props) {
    const { conv, friendInfo, memberList } = props;
    const { t } = useTranslation();
    const [isOpenMemberList, setIsOpenMemberList] = useState(false);
    const [isAddMember, setIsAddMember] = useState(false)

    // console.log("conv::", conv)

    return (<>
        <div className="chat-info">
            {isAddMember && <ModalAddMember memberList={memberList} conv={conv} setIsOpenModal={setIsAddMember} />}
            <div className='chat-info__head'>
                <h2 className='chat-info__head__title'>{conv?.isGroup ? t("group.group_info"):t("group.conv_info")}</h2>
            </div>

            <div className='chat-info__avatar'>
                {conv?.isGroup ? <>
                    {conv?.avatar ? <img src={conv?.avatar} /> : <div className='chat-info__avatars'>
                        {memberList?.slice(0,4)?.map(item => <img src={item.profilePicture} />)}
                    </div>}
                    {conv?.name ? <h2>{conv?.name}</h2> : <h2>No Name Group</h2>}
                </> : <>
                    <img src={friendInfo?.profilePicture} />
                    {friendInfo?.name ? <h2>{friendInfo?.name}</h2> : <h2>No Name Group</h2>}
                </>}
            </div>

            {conv?.isGroup && <div className='chat-info__member-list'>
                <div className='chat-info__member-list__title'>
                    <span>{t("group.member_list")}({memberList?.length || 0})</span>
                    <span onClick={() => setIsOpenMemberList(!isOpenMemberList)}>{isOpenMemberList ?  <FaAngleUp />: <FaAngleDown /> }</span>
                </div>
                {isOpenMemberList && <div className='chat-info__member-list__box'>
                    {memberList?.length > 0 && memberList?.map(member => <div className='chat-info__member-list__box__item'>
                        <img src={member.profilePicture} alt="avt member" />
                        <span>{member.name}</span>
                    </div>)}
                </div>}
                
            </div>}
            <div className='chat-info__add-member' onClick={() => setIsAddMember(!isAddMember)}>
                <span className='chat-info__add-member__icon'><FaPlus /></span>
                <span>{t("group.add_member")}</span>
            </div>
        </div>
    </>)
}

export default ChatInfo;