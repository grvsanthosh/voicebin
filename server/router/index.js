import BlogRoutes from './BlogRoutes.js';
import UserRoutes from './UserRoutes.js';
import AdminRoutes from './AdminRoutes.js';

import express from 'express';

const router = express.Router();

router.use('/blogs', BlogRoutes);

router.use('/users', UserRoutes);

router.use('/admin', AdminRoutes);


router.get('/',(req,res)=>{
    res.send(`<h1>Home page</h1>`);
})

export default router;
