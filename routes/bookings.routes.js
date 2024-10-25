const express=require('express');
const router=express.Router();
const bookingscontroller=require('../controller/bookings.controller');
// authmiddlewares.verifyToken phai login,authmiddlewares.AuthAdmin chỉ admin mới được dùng
const authmiddlewares=require('../auth/auth.middlewares');
// Lấy all thông tin
router.get('/api/bookings',authmiddlewares.verifyToken,bookingscontroller.getallbookings);
// lấy thông tin theo id
router.get('/api/bookings/:booking_id',authmiddlewares.verifyToken,bookingscontroller.getallbookingsbyId);
// thêm thông tin bookings
router.post('/api/bookings/',authmiddlewares.verifyToken,bookingscontroller.addbookings);
// router.put('/api/bookings/:booking_id',bookingscontroller.updatebookings);
// admin duyệt booking_id và trạng thái đặt lưu trú thông qua email
router.put('/api/bookings/admin/approve',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,bookingscontroller.approveBooking);
// xóa
router.delete('/api/bookings/:booking_id',bookingscontroller.deletebookings);

module.exports=router