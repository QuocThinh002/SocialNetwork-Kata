import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import './forms.scss';
import { signIn } from '../../store/actions/auth.action';

const SignInForm = ({ toggleLogin }) => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, token } = useSelector(state => state.authReducer)
  
  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])

  const onSubmit = async (data) => {
    try {
      dispatch(signIn(data))
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Submission has failed.");
    }
  };


  return (
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
          placeholder='Email' 
        />
        {errors.email && <p className='form__error'>{errors.email.message}</p>}
      </div>
      <div className="form__group">
        <input 
          {...register("password", { 
            required: "Password is required", 
            minLength: { value: 8, message: "Password must be at least 8 characters long" }
          })} 
          aria-invalid={errors.password ? "true" : "false"} 
          type="password" 
          id="password" 
          className="form__input" 
          placeholder='Password' 
        />
        {errors.password && <p className='form__error'>{errors.password.message}</p>}
      </div>
      <button type="submit" className="form__button">Sign In</button>
      <div className='form__signin'>
        <span className='text-[blue] hover:text-orange-500 cursor-pointer'>Forgot Password?</span>
        <span onClick={toggleLogin} className="cursor-pointer">Sign Up?</span>
      </div>
    </form>
  );
};

export default SignInForm;
