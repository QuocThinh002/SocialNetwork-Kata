import React from 'react';
import './forms.scss';
import { useForm } from 'react-hook-form';

const SignUpForm = ({ toggleLogin }) => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // Chỉ lấy email và password từ data
      const { name, email, password } = data;

      
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
          {...register("name", { required: 'Name is required' })}
          aria-invalid={errors.name ? "true" : "false"}
          type="text"
          id="name"
          className="form__input"
          placeholder='Name'
        />
        {errors.name && <p className='form__error'>{errors.name.message}</p>}
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
      <div className="form__group">
        <input
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === document.getElementById('password').value || "Passwords do not match"
          })}
          aria-invalid={errors.confirmPassword ? "true" : "false"}
          type="password"
          id="confirmPassword"
          className="form__input"
          placeholder='Confirm Password'
        />
        {errors.confirmPassword && <p className='form__error'>{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit" className="form__button">Sign Up</button>
      <div className='form__signup'>
        <span>Already have an account?<span onClick={toggleLogin} >Sign In</span></span>
      </div>
    </form>
  );
};

export default SignUpForm;
