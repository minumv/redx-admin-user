import express from 'express'
import { deleteUserDetails, getUserDetails, searchUser, updateUserDetails } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/getusers',getUserDetails);
router.post('/updateuser/:id',updateUserDetails);
router.post('/deleteuser/:id',deleteUserDetails);
router.get('/search', searchUser);

export default router;