import {AdminControllers} from '../controller/index.js';
import express from 'express';
import access from '../middleware/access.js';


const router = express.Router();


router.get('/blog/all',access.accessExpriration,access.adminAccess,AdminControllers.getAllBlogs)
router.get('/blog/pendingblogs',access.accessExpriration,access.adminAccess,AdminControllers.pendingblogs)
router.get('/blog/rejectedblogs',access.accessExpriration,access.adminAccess,AdminControllers.rejectedblogs)
router.get('/users',access.accessExpriration,access.adminAccess,AdminControllers.getAllUsers)
router.get('/admins',access.accessExpriration,access.adminAccess,AdminControllers.getAllAdmins)
router.put('/user/:adminaccess',access.accessExpriration,access.adminAccess,AdminControllers.adminaccess)
router.put('/:revokeaccess',access.accessExpriration,access.adminAccess,AdminControllers.revokeaccess)
router.put('/blog/:approveblog',access.accessExpriration,access.adminAccess,AdminControllers.approveblog)
router.delete('/:removeadmin',access.accessExpriration,access.adminAccess,AdminControllers.removeadmin)

export default router;