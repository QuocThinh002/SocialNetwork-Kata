import { Link } from 'react-router-dom'
import { path } from '../../utils/constant'
import './verifyAccount.scss'

function VerifyAccount() {

    return (<>
        <div className='verify-account'>
            <img className='logo' src={`${window.location.origin}/assets/image/logoKata2.png`} alt='logoKata'/>
            <h2>
                Verify account successfully!
                <Link to={'/' + path.LOGIN }>Login</Link>
            </h2> 
        </div>
    </>)
}

export default VerifyAccount;