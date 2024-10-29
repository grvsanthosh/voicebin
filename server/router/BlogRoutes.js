import {BlogControllers} from '../controller/index.js';
import express from 'express';
import access from '../middleware/access.js';


const router = express.Router();


router.get('/approvedblogs',access.allBlogAccess,BlogControllers.approvedblogs)
router.get('/search/:search',access.userAccess,BlogControllers.search)
router.get('/:userid',access.userAccess,BlogControllers.getBlogsByuserId)
router.post('/',access.userAccess,BlogControllers.createBlog)
router.delete('/deleteblog/:blogid',access.userAccess,BlogControllers.deleteBlogById)


export default router;


