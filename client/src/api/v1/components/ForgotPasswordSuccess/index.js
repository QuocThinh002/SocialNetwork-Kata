import { Link } from 'react-router-dom';
import './forgotPasswordSuccess.scss'
import { path } from '../../utils/constant';

function ForgotPasswordSuccess() {
    return (<>
        <div className='forgot-password-success'>
            <img className='forgot-password-success__logo' src={`${window.location.origin}/assets/image/logoKata2.png`} alt='logo' />
            <h2 className='forgot-password-success__title'>
                Để hoàn tất quá trình, vui lòng kiểm tra email của bạn và nhấp vào liên kết trong email đó.<br />
                Nếu không tìm thấy email, hãy kiểm tra thư mục Spam hoặc Junk Mail.
            </h2>
            <Link to={'/' + path.LOGIN} className='forgot-password-success__link'>Login</Link>
        </div>
    </>)
}

export default ForgotPasswordSuccess;