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
import ApproveBlogs from '../components/admin/blog/ApproveBlogs.jsx'
import GetAllBlogs from '../components/admin/blog/GetAllBlogs.jsx';
import PendingBlogs from '../components/admin/blog/PendingBlogs.jsx'
import RejectedBlogs from '../components/admin/blog/RejectedBlogs.jsx'
import AdminAccess from '../components/admin/profile/AdminAccess.jsx'
import GetAllAdmin from '../components/admin/profile/GetAllAdmin.jsx'
import GetAllUsers from '../components/admin/profile/GetAllUsers.jsx'
import RemoveAdmin from '../components/admin/profile/RemoveAdmin.jsx'
import RevokeAccess from '../components/admin/profile/RevokeAccess.jsx'

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
        path:'/approveblogs',
        element:<ProtectedRoute><AdminGaurd><ApproveBlogs/></AdminGaurd></ProtectedRoute>
    },  
    {
        path:'/getallblogs',
        element:<ProtectedRoute><AdminGaurd><GetAllBlogs/></AdminGaurd></ProtectedRoute>
    }, 
    {
        path:'/pendingblogs',
        element:<ProtectedRoute><AdminGaurd><PendingBlogs/></AdminGaurd></ProtectedRoute>
    }, 
    {
        path:'/rejectedblogs',
        element:<ProtectedRoute><AdminGaurd><RejectedBlogs/></AdminGaurd></ProtectedRoute>
    }, 
    {
        path:'/adminaccess',
        element:<ProtectedRoute><AdminGaurd><AdminAccess/></AdminGaurd></ProtectedRoute>
    }, 
    {
        path:'/getalladmin',
        element:<ProtectedRoute><AdminGaurd><GetAllAdmin/></AdminGaurd></ProtectedRoute>
    }, 
    {
        path:'/getallusers',
        element:<ProtectedRoute><AdminGaurd><GetAllUsers/></AdminGaurd></ProtectedRoute>
    }, 
    {
        path:'/removeadmin',
        element:<ProtectedRoute><AdminGaurd><RemoveAdmin/></AdminGaurd></ProtectedRoute>
    }, 
    {
        path:'/revokeaccess',
        element:<ProtectedRoute><AdminGaurd><RevokeAccess/></AdminGaurd></ProtectedRoute>
    },  
   

    //*******************Admin routes*******************//

    {
        path:'*',
        element:<Navigate to="/home"/>
    }

]