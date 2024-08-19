import SignUpSuccess from "../components/SignUpSuccess";
import VerifyAccount from "../components/VerifyAccount";
import LayoutDefault from "../layout/LayoutDefault";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import ForgetPasswordForm from "../pages/Login/ForgotPassword";
import Personal from "../pages/Personal";
import { path } from '../utils/constant'



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
        element: <ForgetPasswordForm />
    }
]