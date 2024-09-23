import './feed.scss';
import { useSelector } from 'react-redux';
import { FaEllipsis, FaLock, FaPlus, FaUserGroup } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import { useEffect, useState } from 'react';
import ModalCreatePost from '../../components/ModalCreatePost';
import convertTime from '../../utils/convertTime';
import { apiGetPosts } from '../../services/post.service';
import PostImages from './PostImages';
import PostContent from './PostContent';
import { useTranslation } from 'react-i18next';
import { getName } from '../../utils';

function Feed() {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.userReducer);
    const navigate = useNavigate();
    const [isShowCreatePost, setIsShowCreatePost] = useState(false); // Trạng thái để hiển thị modal tạo bài viết
    const [posts, setPosts] = useState([]); // Danh sách bài post

    const handleToggleCreatePost = () => {
        setIsShowCreatePost(!isShowCreatePost); // Đóng mở modal tạo bài viết
    };


    useEffect(() => {
        const func = async () => {
            const response = await apiGetPosts();
            const data = response?.data?.posts || [];
            setPosts(data); // Lưu danh sách post vào state
        };
        func();
    }, []);

    return (
        <>
            <div className="container">
                <div className="feed">
                    <div className="feed__story">
                        <div className="feed__story__create">
                            <img src={user?.profilePicture} alt="create-story" />
                            <div className="feed__story__create__box">
                                <span className="feed__story__create__box__add">
                                    <FaPlus />
                                </span>
                                <span className="feed__story__create__box__text">{t("post.create_story")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="feed__create-post">
                        <div className="feed__create-post__head">
                            <img
                                src={user?.profilePicture}
                                onClick={() => navigate('/' + path.PERSONAL)}
                                alt="profile"
                            />
                            <div
                                onClick={handleToggleCreatePost}
                                className="feed__create-post__head__text"
                            >
                                {t("post.what_mind", {name: getName(user?.name)})}
                            </div>
                            xóa bạn Chuyển tiếp
                        </div>
                    </div>

                    <div className="feed__posts">
                        {posts?.length > 0 &&
                            posts.map((post) => (
                                <div className="post" key={post?._id}>
                                    <div className="post__head">
                                        <div className="post__head__image">
                                            <img src={post?.author?.profilePicture} alt="author" />
                                        </div>
                                        <div className="post__head__right">
                                            <div className="post__head__right__box">
                                                <div className="post__head__right__name">
                                                    {post?.author?.name}
                                                </div>
                                                <div className="post__head__right__date-time">
                                                    <span>{convertTime(post?.createdAt)}</span>
                                                    <span>
                                                        {post?.audience === 'friends' ? (
                                                            <FaUserGroup />
                                                        ) : (
                                                            <FaLock />
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="post__head__right__setting">
                                                <FaEllipsis />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post__content">
                                        {post?.content && (
                                            <PostContent
                                                content={post.content}
                                            />
                                        )}

                                        {post?.images && (
                                            <div className="post__content__images">
                                                {post?.images?.length > 0 && (
                                                    <PostImages images={post.images} postId={post._id} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                {isShowCreatePost && (
                    <ModalCreatePost user={user} handleToggleModal={handleToggleCreatePost} />
                )}
            </div>
        </>
    );
}

export default Feed;
