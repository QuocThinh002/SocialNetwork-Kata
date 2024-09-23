import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaTriangleExclamation } from 'react-icons/fa6'

import './forgotPassword.scss'
import { path } from '../../utils/constant'
import { apiForgotPassword } from '../../services/auth.service';


const ForgetPassword = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await apiForgotPassword(data);
      if (response.data.status) {
        navigate('/forgot-password-success')
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Submission has failed.");
    }
  };


  return (
    <div className="forgot-password">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className='form--logo'>
          <img src={`${window.location.origin}/assets/image/logoKata2.png`} alt='logo' />
        </div>

        <div className="form__group">
          <input
            {...register("email", { required: 'Email is required' })}
            aria-invalid={errors.email ? "true" : "false"}
            type="email"
            id="email"
            className="form__input"
            placeholder='E-mail address'
          />
          {errors.email && <p className='form__error'>{errors.email.message}</p>}
        </div>
        <div className='box-btn'>
          <span onClick={() => navigate(`/${path.LOGIN}`)} className="btn btn__cancel">Cancel</span>
          <button onClick={handleSubmit} className="btn btn__find">Reset my password</button>
        </div>

      </form>
    </div>
  );
};

export default ForgetPassword;
