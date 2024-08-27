import { FaXmark, FaCameraRotate } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import ReactLoading from 'react-loading';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from "react-i18next";
import { updateUser, updateUserNoneApi } from '../../store/actions/user.action';
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modelEditPersonal.scss';
import { apiUpdateUser } from '../../services/user.services';

function ModalEditPersonal(props) {
    const { t } = useTranslation();
    const { setIsOpenModal } = props;
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [coverPhotoUrl, setCoverPhotoUrl] = useState(null);
    const [countBio, setCountBio] = useState(user?.bio?.length || 0);
    const maxBio = 100;
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        // formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            profilePicture: user?.profilePicture,
            coverPhoto: user?.coverPhoto,
            bio: user?.bio,
            gender: user?.gender,
        },
    });

    const toastId = useRef(null);

    const notify = () => toastId.current = toast.loading(t("personal.updating_profile"), { autoClose: false, transition: Slide, });

    const updateToast = () => {
        toast.dismiss(toastId.current)
        toast.success(t("personal.update_profile_success"), {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            newestOnTop: true,
            transition: Slide,
        })
    };

    const updateErrorToast = () => {
        toast.dismiss(toastId.current)
        toast.error(t("personal.update_profile_error"), {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            newestOnTop: true,
            transition: Slide,
        })
    }

    const onSubmit = async (data) => {


        setIsLoading(true);
        // console.log('data::', data)
        // console.log('data.profilePicture::', data.profilePicture)
        // console.log('profilePicture::', profilePicture  )

        // const formData = new FormData();
        const formData = new FormData();

        // Chỉ thêm ảnh mới nếu người dùng đã tải ảnh mới lên
        if (profilePicture) formData.append('profilePicture', profilePicture);
        if (coverPhoto) formData.append('coverPhoto', coverPhoto);

        if (data.name !== user?.name) formData.append('name', data.name);
        if (data.name !== user?.email) formData.append('email', data.email);
        if (data.name !== user?.bio) formData.append('bio', data.bio);
        if (data.name !== user?.gender) formData.append('gender', data.gender);

        
        console.log('formData::', formData)
        notify()
        const response = await apiUpdateUser(formData);
        await dispatch(updateUserNoneApi(response));
        
        if (response.status) updateToast()
        else updateErrorToast()

        setTimeout(() => {
            setIsOpenModal(false)
        }, 3000)

    };

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        const type = file.type;
        if (type.startsWith('image/')) {
            setProfilePicture(file);
            setValue('profilePicture', file, { shouldValidate: false });
            setProfilePictureUrl(URL.createObjectURL(file));
        } else {
            alert('Vui lòng chọn tệp ảnh');
        }
    };

    const handleCoverPhotoChange = (event) => {
        console.log('coverPhoto::', event.target.files)
        const file = event.target.files[0];
        const type = file.type;

        if (type.startsWith('image/')) {
            setCoverPhoto(file);
            setValue('coverPhoto', file, { shouldValidate: false });
            setCoverPhotoUrl(URL.createObjectURL(file))
        } else {
            alert('Vui lòng chọn tệp ảnh');
        }

    };

    const handleChangeBio = (e) => {
        const value = e.target.value.substring(0, maxBio);
        setValue('bio', value, { shouldValidate: true });
        setCountBio(value.length);
    };



    return (
        <>
            <div>
                {!isLoading &&
                    <div className="modal">
                    {/* <ReactLoading type="spin" color="#2563eb" height={20} width={20} /> */}
                        <div className="modal__box">
                            <button onClick={() => setIsOpenModal(false)} className="btn modal__close">
                                <FaXmark />
                            </button>

                            <h2 className='modal__title'>{t("personal.edit_profile")}</h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="form-person">
                                <div className='form-person__item form-person__profile-picture'>
                                    <label htmlFor="profilePicture">{t("personal.profile_picture")}</label>
                                    <label htmlFor="profilePicture" className='form-person__profile-picture__image'>
                                        <img src={profilePictureUrl || user?.profilePicture || `${window.location.origin}/assets/image/sky.jpg`} alt='profile-picture' />
                                        <span className='form-person__profile-picture__icon'><FaCameraRotate /></span>
                                    </label>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        onChange={handleProfilePictureChange}
                                    />
                                    {/* {profilePicture && <p>Selected profile picture: {profilePicture.name}</p>} */}
                                </div>

                                <div className='form-person__item'>
                                    <label htmlFor="coverPhoto">{t("personal.cover_photo")}</label>
                                    <label htmlFor="coverPhoto" className='form-person__cover-photo__image'>
                                        <img src={coverPhotoUrl || user?.coverPhoto || `${window.location.origin}/assets/image/sky.jpg`} alt='cover-photo' />
                                        <span className='form-person__cover-photo__icon'><FaCameraRotate /></span>
                                    </label>
                                    <input type="file" id="coverPhoto" onChange={handleCoverPhotoChange} />

                                    {/* {coverPhoto && <p>Selected cover photo: {coverPhoto.name}</p>} */}
                                </div>

                                <div className='form-person__item'>
                                    <label htmlFor="name">{t("personal.name")}</label>
                                    <input {...register('name')} type="text" id="name" />
                                    {/* {errors.name && <span>{errors.name.message}</span>} */}
                                </div>

                                <div className='form-person__item'>
                                    <label htmlFor="email">{t("personal.email")}</label>
                                    <input {...register('email')} type="email" id="email" />
                                    {/* {errors.email && <span>{errors.email.message}</span>} */}
                                </div>

                                <div className='form-person__item'>
                                    <label htmlFor="bio">{t("personal.bio")}</label>
                                    <textarea
                                        {...register('bio', { maxLength: maxBio })}
                                        rows="3"
                                        id="bio"
                                        onChange={handleChangeBio}
                                    />
                                    <p className='form-person__count-bio'>{t("personal.remain_bio", { count: (maxBio - countBio) })}</p>
                                    {/* {errors.bio && <span>{errors.bio.message}</span>} */}
                                </div>

                                <div className='form-person__item'>
                                    <div className='form-person__gender'>
                                        <label htmlFor="gender">{t("personal.gender")}</label>
                                        <select {...register('gender')}>
                                            <option value="male">{t("personal.male")}</option>
                                            <option value="female">{t("personal.female")}</option>
                                            <option value="other">{t("personal.other")}</option>
                                        </select>
                                    </div>
                                    {/* {errors.gender && <span>{errors.gender.message}</span>} */}
                                </div>

                                <div className='form-person__submit'>
                                    <span onClick={() => setIsOpenModal(false)} className='btn btn__cancel'>{t("personal.cancel")}</span>
                                    <button type="submit" className='btn btn__submit'>{t("personal.save_changes")}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }

                <ToastContainer/>
            </div>
        </>
    );
}

export default ModalEditPersonal;