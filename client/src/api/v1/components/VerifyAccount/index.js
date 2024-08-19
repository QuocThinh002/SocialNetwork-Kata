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

    useEffect(async () => {
        const response = await apiVerifyAccount(pathnames[2]);
        setMessage(response?.data?.message);
    }, [])

    return (<>
        <div className='verify-account'>
            <img className='logo' src={`${window.location.origin}/assets/image/logoKata2.png`} alt='logoKata'/>
            <h2>
                {message}
                <Link to={'/' + path.LOGIN }>Login</Link>
            </h2> 
        </div>
    </>)
}

export default VerifyAccount;