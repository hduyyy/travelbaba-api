const express=require('express');
const router=express.Router();
const userscontroller=require('../controller/users.controller');
const authmiddlewares=require('../auth/auth.middlewares');
router.get('/api/users',authmiddlewares.verifyToken,userscontroller.getallusers);
router.get('/api/users/search',authmiddlewares.verifyToken,userscontroller.Findfullname);
router.get('/api/users/:user_id',authmiddlewares.verifyToken,userscontroller.getalluserssbyId);
router.post('/api/users/',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,userscontroller.addusers);
router.put('/api/users/:user_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,userscontroller.updateusers);
router.delete('/api/users/:user_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,userscontroller.deleteusers);

module.exports=router;