const express=require('express');
const router=express.Router();
const authController=require('./auth.controller');
const authmiddlewares=require('./auth.middlewares');
 router.post('/register',authController.authRegister);
 router.post('/login',authController.authLogin);
 router.post('/refreshtoken',authController.refreshAccessToken);

 router.get('/user',authmiddlewares.verifyToken,authmiddlewares.AuthUser,(req,res)=>{
    const {username}=req.user;
    res.status(200).json({code:200, message: `Welcome user ${username} !` });
 });
 router.get('/admin',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,(req,res)=>{
    const {username}=req.user.username;
    res.status(200).json({code:200, message: `Welcome admin ${username} !` });
 });
 router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/change-password',authmiddlewares.verifyToken, authController.ChangePassword);

module.exports=router;