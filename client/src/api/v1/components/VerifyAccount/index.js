import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { apiVerifyAccount } from '../../services/auth.services'
import { path } from '../../utils/constant'
import './verifyAccount.scss'

function VerifyAccount() {
    const [message, setMessage] = useState('Welcome!');
    const location = useLocation();
    const pathnames = location.pathname.split('/');

    useEffect(() => {
        const func = async () => {
            const response = await apiVerifyAccount(pathnames[2]);
            setMessage(response?.data?.message);
        }
        func()
    }, [])

    return (<>
        <div className='verify-account'>
            <img className='logo' src={`${window.location.origin}/assets/image/logoKata2.png`} alt='logoKata' />
            <h2>
                {message}
            </h2>
            <Link to='/login'>Login</Link>
        </div>
    </>)
}

export default VerifyAccount;