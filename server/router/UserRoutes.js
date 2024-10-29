import {Usercontrollers} from '../controller/index.js';
import express from 'express';
import access from '../middleware/access.js';
const router = express.Router();


router.post('/signup',Usercontrollers.signup)
router.post('/login',Usercontrollers.login)
router.put('/edit/:userid',access.userAccess,Usercontrollers.editprofile)
router.delete('/remove/:userid',access.userAccess,Usercontrollers.removeaccount)
router.get('/get/:userid',access.userAccess,Usercontrollers.getProfileById)



export default router;


