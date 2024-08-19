import './resetPassword.scss'

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { apiResetPassword } from '../../services/auth.services';
import { useLocation } from 'react-router-dom';


const ResetPassword = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const location = useLocation();
    const pathnames = location.pathname.split('/');
    const resetPwToken = pathnames[2]

    const onSubmit = async (data) => {
        try {
            const password = data.password;
            const response = await apiResetPassword({resetPwToken, password});
            if (response.data.status) {
                alert(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            console.error("Error during submission:", error);
            alert("Submission has failed.");
        }
    };

    return (<>
        <div className='reset-password'>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className='form--logo'>
                    <img src={`${window.location.origin}/assets/image/logoKata2.png`} alt='logo' />
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
                <button type="submit" className="form__button">Reset Password</button>
            </form>
        </div>
    </>
    );
};

export default ResetPassword;
