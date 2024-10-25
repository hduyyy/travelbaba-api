const express=require('express');
const router=express.Router();
const eventscontroller=require('../controller/events.controller');
// authmiddlewares.verifyToken phai login,authmiddlewares.AuthAdmin chỉ admin mới được dùng
const authmiddlewares=require('../auth/auth.middlewares');
// lấy all thông tin
router.get('/api/events',eventscontroller.getallevents);
// lấy thông tin theo id
router.get('/api/events/:event_id',eventscontroller.getalleventsbyId);
// lấy đường dẫn ảnh theo id
router.get('/api/events/:event_id/images',eventscontroller.getalleventsimgbyId);
// tìm kiếm title 
router.post('/api/events/search',authmiddlewares.verifyToken,eventscontroller.Findeventstitle);
// thêm
router.post('/api/events',eventscontroller.addevents);
// sửa
router.put('/api/events/:event_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,eventscontroller.updateevents);
// xóa
router.delete('/api/events/:event_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,eventscontroller.deleteevents);
module.exports=router;