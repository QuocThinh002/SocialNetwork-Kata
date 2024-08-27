
import { Link, useNavigate } from 'react-router-dom';
import './signUpSuccess.scss';

function SignUpSuccess() {
    const navigate = useNavigate();

    return (<>
        <div className='signup-success'>
            <img className='signup-success__logo' src={`${window.location.origin}/assets/image/logoKata2.png`} alt='logo' />
            <h2 className='signup-success__title'>
                Chúc mừng bạn đã đăng ký thành công!<br />
                Để hoàn tất quá trình, vui lòng kiểm tra email của bạn và nhấp vào liên kết xác thực trong email đó.<br />
                Nếu không tìm thấy email, hãy kiểm tra thư mục Spam hoặc Junk Mail.
            </h2>
            {/* <button onClick={() => navigate('back')} className='btn'>Login</button> */}
            <div className='signup-success__link'>
                <Link to='/login'>Login</Link>
                <Link to='https://mail.google.com/'>Go to Mail</Link>
            </div>

        </div>
    </>)
}

export default SignUpSuccess