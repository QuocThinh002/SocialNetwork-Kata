import { FaUserGroup, FaLock, FaXmark, FaImage, FaPlus, FaTrash } from 'react-icons/fa6';
import { BiSolidImageAdd, BiSolidVideoPlus } from 'react-icons/bi';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modalCreateComment.scss';
import { useDispatch } from 'react-redux';

import { apiCreatePost } from '../../services/post.service';
import { getName } from '../../utils/index';

function ModalCreateComment(props) {
    const { handleToggleModal, user, post, parentTop } = props;
    const { t } = useTranslation();
    const [postContent, setPostContent] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const [isAudienFriends, setIsAudienFriends] = useState(true);
    const dispatch = useDispatch();
    const fileImageRef = useRef(null);
    const fileVideoRef = useRef(null);
    const MAX_IMAGES = 10;
    const [images, setImages] = useState([]);
    const [imagesUrl, setImagesUrl] = useState([]);
    const [video, setVideo] = useState(null);
    const textareaRef = useRef(null);


    const handleInput = (e) => {
        const textarea = textareaRef.current;
        setPostContent(e.target.value);

        // Reset lại chiều cao của textarea để tính toán lại
        textarea.style.height = 'auto';

        // Tự động điều chỉnh chiều cao dựa trên nội dung
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true when starting the request

        const formData = new FormData();
        formData.append('content', postContent);
        formData.append('typePost', 'comment');
        formData.append('parent', post?._id);
        if (parentTop)
            formData.append('parentTop', parentTop);
        images.forEach((image) => {
            formData.append('images', image);
        });

        if (video) formData.append('video', video);


        try {
            const response = await apiCreatePost(formData);  // Gửi formData thay vì JSON object

            if (response?.data?.success) {
                toast.success('post created successfully!');
                // await dispatch(getConversationsInfo())
                handleToggleModal()  // Đóng modal khi thành công
            } else {
                toast.error('Create post failed');
            }
        } catch (error) {
            console.error('Error while creating post:', error);
            toast.error('An error occurred while creating the post');
        } finally {
            setIsLoading(false); // Set loading to false once the request is complete
        }
    };


    const handleToggleAudien = () => {
        setIsAudienFriends(!isAudienFriends)
    };

    const handleImageChange = (e) => {
        let files = Array.from(e.target.files);
        if (images.length + files.length > MAX_IMAGES) {
            alert(`You can only upload up to ${MAX_IMAGES} images.`);
            files = files.slice(0, MAX_IMAGES - images.length);
        }

        const newImageUrls = files.map((file) => URL.createObjectURL(file));

        setImages((prevImages) => [...prevImages, ...files]);
        setImagesUrl((prevImagesUrl) => [...prevImagesUrl, ...newImageUrls]);
    };

    const handleClosePreviewImage = () => {
        setImages([]);
        setImagesUrl([]);
        if (fileImageRef.current) {
            fileImageRef.current.value = null; // Reset giá trị input file khi đóng preview
        }
    };

    const handleClosePreviewImageItem = (image) => {
        const index = imagesUrl.indexOf(image);

        if (index !== -1) {
            const newImagesUrl = imagesUrl.filter((_, i) => i !== index);
            const newImages = images.filter((_, i) => i !== index);

            setImagesUrl(newImagesUrl);
            setImages(newImages);

            // Update the file input
            const dataTransfer = new DataTransfer();
            newImages.forEach((file) => {
                dataTransfer.items.add(file);
            });
            fileImageRef.current.files = dataTransfer.files; // Update file input with remaining files
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            if (fileVideoRef.current) {
                fileVideoRef.current.value = null;
            }
        }
    };

    const handleClosePreviewVideo = () => {
        setVideo(null);
    };


    return (
        <>
            <div className={`modal  ${isLoading ? 'modal--disabled' : ''}`}>
                <div className={`modal__box`}>
                    <button onClick={() => !isLoading && handleToggleModal()} className="btn modal__close" disabled={isLoading}>
                        <FaXmark />
                    </button>

                    <h2 className='modal__title'>{t("post.create_post")}</h2>
                    <form onSubmit={handleSubmit} className="form-create-post">
                        <div className='form-create-post__head'>
                            <div className='form-create-post__profile-picture'>
                                <label htmlFor="avatar" className='form-create-post__profile-picture__image'>
                                    <img src={user?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`} alt='profile-picture' />
                                </label>
                            </div>
                            <div className='form-create-post__head__right'>
                                <span className='form-create-post__name'>{user?.name}</span>
                                {isAudienFriends
                                    ? <div className='form-create-post__audience'><label htmlFor='audien-friends'><FaUserGroup /> {t("post.friends")}</label><input onClick={handleToggleAudien} type='radio' id='audien-friends' name='audien' value='friends' /></div>
                                    : <div className='form-create-post__audience'><label htmlFor='audien-private'><FaLock /> {t("post.private")}</label><input onClick={handleToggleAudien} type='radio' id='audien-private' name='audien' value='private' /></div>
                                }


                            </div>

                        </div>

                        <div className='form-create-post__content'>
                            <textarea
                                ref={textareaRef}
                                id='post-content'
                                name='postContent'
                                autoComplete='off'
                                value={postContent}
                                onChange={handleInput}
                                placeholder={t("post.what_mind", { name: getName(user?.name) })}
                                rows={3}
                                maxLength={1000}
                            />
                        </div>

                        {imagesUrl && imagesUrl.length > 0 && (
                            <div className='preview-post-images'>
                                <span onClick={handleClosePreviewImage} className='preview-post-images__close'><FaXmark /></span>
                                {imagesUrl.map((image, idx) => (
                                    <div className='preview-post-images__item' key={idx}>
                                        <img src={image} alt={`preview-${idx}`} />
                                        <span onClick={() => handleClosePreviewImageItem(image)} className='preview-post-images__item__close'><FaXmark /></span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {video && (
                            <div className='preview-post-video'>
                                <video controls width="100%">
                                    <source src={URL.createObjectURL(video)} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <span onClick={handleClosePreviewVideo} className='preview-post-video__close'><FaXmark /></span>
                            </div>
                        )}

                        <div className='form-create-post__upload-file'>
                            <label htmlFor='upload-images' className='attach-file'><BiSolidImageAdd /></label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                id='upload-images'
                                ref={fileImageRef} // Gắn ref vào input file
                            />

                            <label htmlFor='upload-video' className='attach-file'><BiSolidVideoPlus /></label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoChange}
                                id='upload-video'
                                ref={fileVideoRef}
                            />
                        </div>

                        <div className='form-create-post__submit'>
                            {/* <span onClick={() => !isLoading && handleToggleModal()} className='btn btn__cancel' disabled={isLoading}>{t("post.cancel")}</span> */}
                            <button type="submit" className='btn btn__submit' disabled={isLoading}>
                                {isLoading ? <div className="spinner"></div> : t("post.post")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default ModalCreateComment;
