import './feed.scss'

import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import { useState } from 'react';
import ModalCreatePost from '../../components/ModalCreatePost';

function Feed() {

    const { user } = useSelector(state => state.userReducer);
    const navigate = useNavigate();
    const [isShowCreatePost, setIsShowCreatePost] = useState(false);

    const handleToggleCreatePost = () => {
        setIsShowCreatePost(!isShowCreatePost);
    }

    return (<>
        <div className='container'>
            <div className='feed'>
                <div className='feed__story'>
                    <div className='feed__story__create'>
                        <img src={user?.profilePicture} alt='create-story' />
                        <div className='feed__story__create__box'>
                            <span className='feed__story__create__box__add'><FaPlus /></span>
                            <span className='feed__story__create__box__text'>CreAte StOry</span>
                        </div>
                    </div>
                    <div className='feed__story__item'>

                    </div>
                </div>
                <div className='feed__create-post'>
                    <div className='feed__create-post__head'>
                        <img src={user?.profilePicture} onClick={() => navigate('/'+path.PERSONAL)}/>
                        <div onClick={handleToggleCreatePost} className='feed__create-post__head__text'>ƯhAt'S oN yOuR mInD, {user?.name}?</div></div>
                </div>
                <div>
                </div>

                <div className='feed__posts'>
                    post-item
                </div>
            </div>
            {isShowCreatePost && <ModalCreatePost user={user} handleToggleModal={handleToggleCreatePost} />}
        </div>
    </>)
}

export default Feed;