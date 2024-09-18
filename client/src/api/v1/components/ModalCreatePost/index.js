import { FaUserGroup, FaLock, FaXmark, FaImage, FaPlus, FaTrash } from 'react-icons/fa6';
import { BiSolidImageAdd } from 'react-icons/bi';

import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modalCreatePost.scss';
import { apiCreatePost } from '../../services/chat.services';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getConversationsInfo } from '../../store/actions/chat.action';

function ModalCreatePost(props) {
    const { handleToggleModal, user } = props;
    const { t } = useTranslation();
    const { friends } = useSelector(state => state.userReducer);
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [postName, setPostName] = useState('');
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const [isAudienFriends, setIsAudienFriends] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const MAX_IMAGES = 10;
    const [images, setImages] = useState([]);
    const [imagesUrl, setImagesUrl] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true when starting the request

        const formData = new FormData();
        formData.append('postName', postName);
        formData.append('avatar', avatar);
        formData.append('images', images);


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

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file?.type.startsWith('image/')) {
            setAvatar(file);
            setAvatarUrl(URL.createObjectURL(file));
        } else {
            toast.error('Please select a valid image file');
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
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Reset giá trị input file khi đóng preview
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
            fileInputRef.current.files = dataTransfer.files; // Update file input with remaining files
        }
    };

    return (
        <>
            <div className={`modal  ${isLoading ? 'modal--disabled' : ''}`}>
                <div className={`modal__box`}>
                    <button onClick={() => !isLoading && handleToggleModal()} className="btn modal__close" disabled={isLoading}>
                        <FaXmark />
                    </button>

                    <h2 className='modal__title'>{t("post.CrEaTe__PoSt")}</h2>
                    <form onSubmit={handleSubmit} className="form-create-post">
                        <div className='form-create-post__head'>
                            <div className='form-create-post__profile-picture'>
                                <input type="file" id="avatar" onChange={handleAvatarChange} disabled={isLoading} />

                                <label htmlFor="avatar" className='form-create-post__profile-picture__image'>
                                    <img src={avatarUrl || `${window.location.origin}/assets/image/sky.jpg`} alt='profile-picture' />
                                </label>
                            </div>
                            <div className='form-create-post__head__right'>
                                <span className='form-create-post__name'>{user?.name}</span>
                                {isAudienFriends
                                    ? <div><label htmlFor='audien-friends'><FaUserGroup /> fRienDs</label><input onClick={handleToggleAudien} type='radio' id='audien-friends' name='audien' value='friends' /></div>
                                    : <div><label htmlFor='audien-private'><FaLock /> oNLy mE</label><input onClick={handleToggleAudien} type='radio' id='audien-private' name='audien' value='private' /></div>
                                }


                            </div>

                        </div>
                        <div className='form-create-post__content'>
                            <textarea
                                id='post-name'
                                name='postName'
                                autoComplete='off'
                                required
                                value={postName}
                                onChange={(e) => setPostName(e.target.value)}
                                placeholder={`post.whatonyourmind`}
                                disabled={isLoading}
                                rows={8}
                            >
                            </textarea>
                        </div>

                        {imagesUrl && imagesUrl.length > 0 && (
                            <div className='preview-post-images'>
                                <button onClick={handleClosePreviewImage} className='preview-post-images__close'><FaXmark /></button>
                                {imagesUrl.map((image, idx) => (
                                    <div className='preview-post-images__item' key={idx}>
                                        <img src={image} alt={`preview-${idx}`} />
                                        <button onClick={() => handleClosePreviewImageItem(image)} className='preview-post-images__item__close'><FaXmark /></button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className='form-create-post__upload-file'>
                            <label htmlFor='upload-images' className='attach-file'><BiSolidImageAdd/></label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                id='upload-images'
                                ref={fileInputRef} // Gắn ref vào input file
                            />
                        </div>

                        <div className='form-create-post__submit'>
                            <span onClick={() => !isLoading && handleToggleModal()} className='btn btn__cancel' disabled={isLoading}>{t("post.cancel")}</span>
                            <button type="submit" className='btn btn__submit' disabled={isLoading}>
                                {isLoading ? <div className="spinner"></div> : t("post.CrEaTe")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default ModalCreatePost;
