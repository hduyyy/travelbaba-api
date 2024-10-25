const express=require('express');
const router=express.Router();
const shopping_centerscontroller=require('../controller/shopping_centers.controller');
// authmiddlewares.verifyToken phải thực hiện login trước,authmiddlewares.AuthAdmin chỉ admin mới được dùng
const authmiddlewares=require('../auth/auth.middlewares');
// lấy all 
router.get('/api/shopping_centers',authmiddlewares.verifyToken,shopping_centerscontroller.getallshopping_centers);
// lấy all theo id
router.get('/api/shopping_centers/:shopping_center_id',authmiddlewares.verifyToken,shopping_centerscontroller.getallshopping_centerssbyId);
// tìm kiếm thư mục ảnh theo id
router.get('/api/shopping_centers/:shopping_center_id/images',authmiddlewares.verifyToken,shopping_centerscontroller.getallshopping_centersimgbyId);
// tìm kiếm theo title của bảng shopping
router.post('/api/shopping_centers/search',authmiddlewares.verifyToken,shopping_centerscontroller.Findshopping_centerstitle);
// thêm mới
router.post('/api/shopping_centers',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,shopping_centerscontroller.addshopping_centers);
// cập nhật
router.put('/api/shopping_centers/:shopping_center_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,shopping_centerscontroller.updateshopping_centers);
// xóa
router.delete('/api/shopping_centers/:shopping_center_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,shopping_centerscontroller.deleteshopping_centers);
module.exports=router;