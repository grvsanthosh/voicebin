import {Navigate} from 'react-router-dom';
import ProtectedRoute from '../utils/ProtectedRoute.jsx'
import AdminGaurd from '../utils/AdminGaurd.jsx'
import UserGaurd from '../utils/UserGaurd.jsx'
import Login from '../components/Login.jsx'
import Home from '../components/Home.jsx';
import Signup from '../components/Signup.jsx';

import SideBar from '../components/sidebar/SideBar.jsx';

import Logout from '../components/Logout.jsx'
//*******************user components*******************//
import Blogfeeds from '../components/Blogfeeds.jsx';
import CreateBlogs from '../components/user/blog/CreateBlogs.jsx'
import MyBlogs from '../components/user/blog/MyBlogs.jsx'
import SearchBlogs from '../components/user/blog/SearchBlogs.jsx'
import ProfileSettings from '../components/user/profile/ProfileSettings.jsx'

//*******************user components*******************//

//*******************Admin components*******************//

import BlogStatus from '../components/admin/blog/BlogStatus.jsx';
import GetAllAdmin from '../components/admin/profile/GetAllAdmin.jsx'
import GetAllUsers from '../components/admin/profile/GetAllUsers.jsx'

//*******************Admin components*******************//
export default [
    {
        path:'/home',
        element:<Home/>
    },
    
    {
        path:'/login',
        element:<Login/>
    }, 
    {
        path:'/signup',
        element:<Signup/>
    },
   
    {
        path:'/logout',
        element:<ProtectedRoute><SideBar/><Logout/></ProtectedRoute>
    },
  
    {
        path:'/blogfeeds',
        element:<ProtectedRoute><SideBar/><Blogfeeds/></ProtectedRoute>
    },
    //*******************user routes*******************//
    
    
    {
        path:'/createblogs',
        element:<ProtectedRoute><UserGaurd><SideBar/><CreateBlogs/></UserGaurd></ProtectedRoute>
    },
    {
        path:'/myblogs',
        element:<ProtectedRoute><UserGaurd><SideBar/><MyBlogs/></UserGaurd></ProtectedRoute>
    },
  
    {
        path:'/searchblogs',
        element:<ProtectedRoute><UserGaurd><SideBar/><SearchBlogs/></UserGaurd></ProtectedRoute>
    },
    {
        path:'/profilesettings',
        element:<ProtectedRoute><UserGaurd><SideBar/><ProfileSettings/></UserGaurd></ProtectedRoute>
    },
  
    

    //*******************user routes*******************//

    //*******************Admin routes*******************//

   
    {
        path:'/blogstatus',
        element:<ProtectedRoute><AdminGaurd><SideBar/><BlogStatus/></AdminGaurd></ProtectedRoute>
    }, 
    {
        path:'/getalladmin',
        element:<ProtectedRoute><AdminGaurd><SideBar/><GetAllAdmin/></AdminGaurd></ProtectedRoute>
    }, 
    {
        path:'/getallusers',
        element:<ProtectedRoute><AdminGaurd><SideBar/><GetAllUsers/></AdminGaurd></ProtectedRoute>
    }, 
    //*******************Admin routes*******************//

    {
        path:'*',
        element:<Navigate to="/home"/>
    }

]