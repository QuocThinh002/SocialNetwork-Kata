import VerifyAccount from "../components/VerifyAccount";
import LayoutDefault from "../layout/LayoutDefault";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import { path } from '../utils/constant'



export const routes = [
    {
        path: path.HOME,
        element: <LayoutDefault />,
        children: [
            {   
                path: path.FEED,
                element: <Feed />
            }
        ]
    }, {
        path: path.LOGIN,
        element: <Login />
    }, {
        path: path.VERIFY_ACCOUNT,
        element: <VerifyAccount />
    }
]