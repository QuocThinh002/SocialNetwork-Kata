
import { Link, useNavigate } from 'react-router-dom';
import './signUpSuccess.scss';
import { path } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetSignUpSuccess } from '../../store/actions/auth.action';

function SignUpSuccess() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signUpSuccess } = useSelector(state => state.authReducer);


    useEffect(() => {
        if (signUpSuccess) dispatch(resetSignUpSuccess())
        else navigate('back');
    }, [])

    return (<>
        <div className='signup-success'>
            <img className='signup-success__logo' src={`${window.location.origin}/assets/image/logoKata2.png`} alt='logo' />
            <h2 className='signup-success__title'>
                Chúc mừng bạn đã đăng ký thành công!<br />
                Để hoàn tất quá trình, vui lòng kiểm tra email của bạn và nhấp vào liên kết xác thực trong email đó.<br />
                Nếu không tìm thấy email, hãy kiểm tra thư mục Spam hoặc Junk Mail.
            </h2>
            <Link to='/login'>Login</Link>
        </div>
    </>)
}

export default SignUpSuccess