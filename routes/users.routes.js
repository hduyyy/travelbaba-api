const express=require('express');
const router=express.Router();
const userscontroller=require('../controller/users.controller');
const authmiddlewares=require('../auth/auth.middlewares');
//get all
router.get('/api/users',authmiddlewares.verifyToken,userscontroller.getallusers);
//tim kiem
router.get('/api/users/search',authmiddlewares.verifyToken,userscontroller.Findfullname);
//get all theo id
router.get('/api/users/:user_id',authmiddlewares.verifyToken,userscontroller.getalluserssbyId);
//them user thuoc admin
router.post('/api/users/',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,userscontroller.addusers);
//cap nhat user
router.put('/api/users/:user_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,userscontroller.updateusers);
//xoa user
router.delete('/api/users/:user_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,userscontroller.deleteusers);
// authmiddlewares.verifyToken phai login,authmiddlewares.AuthAdmin chỉ admin mới được dùng
module.exports=router;