const express=require('express');
const router=express.Router();
const homestayscontroller=require('../controller/homestays.controller');
// authmiddlewares.verifyToken phai login,authmiddlewares.AuthAdmin chỉ admin mới được dùng
const authmiddlewares=require('../auth/auth.middlewares')
// lấy all thông tin
router.get('/api/homestays',authmiddlewares.verifyToken,homestayscontroller.getallhomestays);
// lấy all thông tin theo id
router.get('/api/homestays/:homestay_id',authmiddlewares.verifyToken,homestayscontroller.getallhomestaysbyId);
// tìm kiếm theo title
router.post('/api/homestays/search',authmiddlewares.verifyToken,homestayscontroller.Findhomestaytitle);
// thêm
router.post('/api/homestays/',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,homestayscontroller.addhomestays);
// sửa
router.put('/api/homestays/:homestay_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,homestayscontroller.updatehomestays);
//xóa
router.delete('/api/homestays/:homestay_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,homestayscontroller.deletehomestays);


module.exports=router;