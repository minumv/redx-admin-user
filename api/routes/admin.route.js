import express from 'express'
import { blockUserDetails, deleteUserDetails, getSelectedUser, getUserDetails, searchUser, unblockUserDetails, updateUserDetails } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/getusers',getUserDetails);
router.post('/updateuser/:id',updateUserDetails);
router.post('/deleteuser/:id',deleteUserDetails);
router.post('/blockuser/:id',blockUserDetails);
router.post('/unblockuser/:id',unblockUserDetails);
router.get('/getDetails/:id',getSelectedUser);
router.get('/search', searchUser);

export default router;