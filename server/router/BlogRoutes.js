import {BlogControllers} from '../controller/index.js';
import express from 'express';
import access from '../middleware/access.js';


const router = express.Router();


router.get('/approvedblogs',access.userAccess,BlogControllers.approvedblogs)
router.get('/search',access.userAccess,BlogControllers.search)
router.get('/:userid',access.userAccess,BlogControllers.getBlogsByuserId)
router.post('/',access.userAccess,BlogControllers.createBlog)

export default router;


