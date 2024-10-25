const express=require('express');
const router=express.Router();
const tourscontroller=require('../controller/tours.controller');

const authmiddlewares=require('../auth/auth.middlewares');
//get all
router.get('/api/tours',authmiddlewares.verifyToken,tourscontroller.getalltours);
//get all theo id
router.get('/api/tours/:tour_id',authmiddlewares.verifyToken,tourscontroller.getalltourssbyId);
//tim kiem
router.get('/api/tours/search',authmiddlewares.verifyToken,tourscontroller.Findtourstitle);
//tim kiem file thư mục ảnh theo id 
router.get('/api/tours/:tour_id/images',authmiddlewares.verifyToken,tourscontroller.getalltoursimgbyId);
// thêm mới
router.post('/api/tours',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,tourscontroller.addtours);
//cập nhật
router.put('/api/cuisines/:tour_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,tourscontroller.updatetours);
// xóa
router.delete('/api/cuisines/:tour_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,tourscontroller.deletetours);
// authmiddlewares.verifyToken phai login,authmiddlewares.AuthAdmin chỉ admin mới được dùng
module.exports=router;
