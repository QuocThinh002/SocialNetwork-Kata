import SignUpSuccess from "../components/SignUpSuccess";
import VerifyAccount from "../components/VerifyAccount";
import ForgotPasswordSuccess from "../components/ForgotPasswordSuccess";
import LayoutDefault from "../layout/LayoutDefault";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgotPassword";
import ResetPassword from '../pages/ResetPassword'
import Personal from "../pages/Personal";
import { path } from '../utils/constant';
import Messages from "../pages/Messages";
import Friends from "../pages/Friends";
import { Navigate } from "react-router-dom";
import FindUser from "../pages/FindUser";




export const routes = [
    {
        path: path.HOME,
        element: <LayoutDefault />,
        children: [
            {   
                path: path.FEED,
                element: <Feed />
            },
            {
                path: path.PERSONAL,
                element: <Personal />
            },
            {
                path: path.MESSAGES,
                element: <Messages />
            },
            {
                path: path.FRIENDS,
                element: <Friends />
            },
            {
                path: path.FIND_USER,
                element: <FindUser />
            }
        ]
    }, {
        path: path.LOGIN,
        element: <Login />
    }, 
    {
        path: path.VERIFY_ACCOUNT,
        element: <VerifyAccount />
    },
    {
        path: path.SIGNUP_SUCCESS,
        element: <SignUpSuccess />
    },
    {
        path: path.FORGOT_PASSWORD,
        element: <ForgetPassword />
    },
    {
        path: path.FORGOT_PASSWORD_SUCCESS,
        element: <ForgotPasswordSuccess />
    },
    {
        path: path.RESET_PASSWORD,
        element: <ResetPassword />
    },
    {
        path: '*',  // Wildcard cho các route không tồn tại
        element: <Navigate to={'/'} />  // Chuyển hướng về trang chủ
    }
];