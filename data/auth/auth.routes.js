const express=require('express');
const router=express.Router();
const authController=require('./auth.controller');
const authmiddlewares=require('./auth.middlewares');
 router.post('/register',authController.authRegister);
 router.post('/login',authController.authLogin);
 router.post('/refreshtoken',authController.refreshAccessToken);

 router.get('/user',authmiddlewares.verifyToken,authmiddlewares.AuthUser,(req,res)=>{
    const {user_name}=req.user;
    res.status(200).json({code:200, message: `Welcome ${user_name} !` });
 });
 router.get('/admin',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,(req,res)=>{
    const {user_name}=req.user;
    res.status(200).json({code:200, message: `Welcome admin ${user_name} !` });
 });
 router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
module.exports=router;