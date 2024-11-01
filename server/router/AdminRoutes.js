import {AdminControllers} from '../controller/index.js';
import express from 'express';
import access from '../middleware/access.js';


const router = express.Router();


router.get('/blog/all/:status/:search',access.accessExpriration,access.adminAccess,AdminControllers.BlogSearch)
router.get('/blog/fetchblogstatus/:status',access.accessExpriration,access.adminAccess,AdminControllers.fetchBlogByStatus)
router.get('/users',access.accessExpriration,access.adminAccess,AdminControllers.getAllUsers)
router.get('/admins',access.accessExpriration,access.adminAccess,AdminControllers.getAllAdmins)
router.put('/user/adminaccess',access.accessExpriration,access.adminAccess,AdminControllers.adminaccess)
router.put('/revokeaccess',access.accessExpriration,access.adminAccess,AdminControllers.revokeaccess)
router.put('/blog/approve',access.accessExpriration,access.adminAccess,AdminControllers.approveblog)
router.delete('/removeadmin/:userid',access.accessExpriration,access.adminAccess,AdminControllers.removeadmin)

export default router;