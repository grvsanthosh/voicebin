


export default {

    
    //********** Usercontrollers **********//

     USER_EDIT_PROFILE :{
        path:'/users/edit',
        auth:true
    },
    USER_GET_PROFILE :{
        path:'/users/get',
        auth:true
    },
    USER_REMOVE_ACCOUNT :{
        path:'/users/remove',
        auth:true
    },

    GLOBAL_BLOG_SEARCH :{
        path:'/blogs/search',
        auth:true
    },
    GET_BLOG_BY_USERID :{
        path:'/blogs',
        auth:true
    },
    USER_CREATE_BLOG :{
        path:'/blogs/',
        auth:true
    },
    DELETE_BLOG_BY_BLOGID :{
        path:'/blogs/deleteblog',
        auth:true
    },

    //********** Usercontrollers **********//

   
    //********** AdminControllers **********//

    ADMIN_GET_ALL_BLOGS :{
        path:'/admin/blog/all',
        auth:true
    },
    FETCH_BLOG_BY_STATUS :{
        path:'/admin/blog/fetchblogstatus',
        auth:true
    },
    // ADMIN_REJECTED_BLOGS :{
    //     path:'/admin/blog/rejectedblogs',
    //     auth:true
    // },
    ADMIN_GET_ALL_USERS :{
        path:'/admin/users',
        auth:true
    },
    ADMIN_GET_ALL_ADMINS :{
        path:'/admin/admins',
        auth:true
    },
    ADMIN_PROVIDE_ADMIN_ACCESS :{
        path:'/admin/user/adminaccess',
        auth:true
    },
    ADMIN_REVOKE_ADMIN_ACCESS :{
        path:'/admin/revokeaccess',
        auth:true
    },
    ADMIN_APPROVE_BLOGS :{
        path:'/admin/blog/approve',
        auth:true
    },
    ADMIN_REMOVE_ADMIN_ACCOUNT :{
        path:'/admin/removeadmin',
        auth:true
    },

    //********** AdminControllers **********//


    //********** Common controllers **********//

    GLOBAL_BLOG_FEED :{
        path:'/blogs/approvedblogs',
        auth:true
    },

    USER_SIGNUP :{
        path:'/users/signup',
        auth:false
    },
    USER_LOGIN :{
        path:'/users/login',
        auth:false
    },

     //********** Common controllers **********//


}