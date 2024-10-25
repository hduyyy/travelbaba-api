const express=require('express');
const router=express.Router();
const authController=require('./auth.controller');
const authmiddlewares=require('./auth.middlewares');
// thủ tục đăng ký 
 router.post('/register',authController.authRegister);
 // thủ tục đăng nhập 
 router.post('/login',authController.authLogin);
 // cấp accesstoken thông qua refreshtoken
 router.post('/refreshtoken',authController.refreshAccessToken);
// kiểm tra phân quyền user
 router.get('/user',authmiddlewares.verifyToken,authmiddlewares.AuthUser,(req,res)=>{
    const {username}=req.user;
    res.status(200).json({code:200, message: `Welcome user ${username} !` });
 });
 // kiểm tra phân quyền admin
 router.get('/admin',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,(req,res)=>{
    const {username}=req.user.username;
    res.status(200).json({code:200, message: `Welcome admin ${username} !` });
 });
 // khi user quên mật khẩu, nhập email để gửi code 
 router.post('/forgot-password', authController.forgotPassword);
 // user nhập thông tin và code được gửi qua email , nhập mk mới  
router.post('/reset-password', authController.resetPassword);
//user thay đổi mật khẩu
router.post('/change-password',authmiddlewares.verifyToken, authController.ChangePassword);
// cập nhật role
router.put('/updaterole/:user_id', authmiddlewares.verifyToken, authController.UpdateRole);


module.exports=router;