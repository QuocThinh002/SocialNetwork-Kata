import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";


export const routes = [
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {   
                path: 'home',
                element: <Home />
            }
        ]
    }
]