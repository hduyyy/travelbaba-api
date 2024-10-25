const express=require('express');
const cuisinescontroller=require('../controller/cuisines.controller');
// authmiddlewares.verifyToken phai login,authmiddlewares.AuthAdmin chỉ admin mới được dùng
const authmiddlewares=require('../auth/auth.middlewares');
const router=express.Router();
// lấy all thông tin
router.get('/api/cuisines',authmiddlewares.verifyToken,cuisinescontroller.getallcuisines);
// lấy thông tin theo id
router.get('/api/cuisines/:cuisines_id',authmiddlewares.verifyToken,cuisinescontroller.getallcuisinesbyId);
// lấy đường dẫn ảnh theo id
router.get('/api/cuisines/:cuisines_id/images',authmiddlewares.verifyToken,cuisinescontroller.getallcuisinesimgbyId);
//tìm kiếm theo title
router.post('/api/cuisines/search',authmiddlewares.verifyToken,cuisinescontroller.Findcuisinestitle);
//thêm
router.post('/api/cuisines',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,cuisinescontroller.addcuisine);
//sửa
router.put('/api/cuisines/:cuisines_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,cuisinescontroller.updatecuisines);
// xóa
router.delete('/api/cuisines/:cuisines_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,cuisinescontroller.deletecuisines);
module.exports=router