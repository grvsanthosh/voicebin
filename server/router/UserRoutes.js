import {Usercontrollers} from '../controller/index.js';
import express from 'express';
import access from '../middleware/access.js';
const router = express.Router();


router.post('/signup',Usercontrollers.signup)
router.post('/login',Usercontrollers.login)
router.put('/:editprofile',access.userAccess,Usercontrollers.editprofile)
router.delete('/:removeaccount',access.userAccess,Usercontrollers.removeaccount)


export default router;


