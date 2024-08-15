import './login.scss'
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import { useState } from 'react'


function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin = () => {
        setIsLogin(!isLogin)
    }
    
    return (<>
        <div className='login'>
            {isLogin ? <SignInForm toggleLogin={toggleLogin} />:<SignUpForm toggleLogin={toggleLogin} />}
        </div>
    </>)
}

export default Login;