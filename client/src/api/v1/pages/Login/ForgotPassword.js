import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaTriangleExclamation } from 'react-icons/fa6'

import './forgotPassword.scss'
import './forms.scss';
import { path } from '../../utils/constant'
import { apiForgotPassword } from '../../services/auth.services';


const ForgetPasswordForm = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { message } = useSelector(state => state.authReducer)

  const onSubmit = async (data) => {
    try {
      const response = await apiForgotPassword(data);

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

        {message && <p className='form__error__server'><FaTriangleExclamation /> {message}</p>}

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
          <button className="btn btn__find">Reset my password</button>
        </div>

      </form>
    </div>
  );
};

export default ForgetPasswordForm;
