const express=require('express');
const router=express.Router();

const reviewscontroller=require('../controller/reviews.controller');
// authmiddlewares.verifyToken phải thực hiện login trước,authmiddlewares.AuthAdmin chỉ admin mới được dùng
const authmiddlewares=require('../auth/auth.middlewares');
// lấy all
router.get('/api/reviews',authmiddlewares.verifyToken,reviewscontroller.getallreviews);
// lấy theo id
router.get('/api/reviews/:review_id',authmiddlewares.verifyToken,reviewscontroller.getallreviewsbyId);
// tìm kiếm comment
router.post('/api/reviews/search',authmiddlewares.verifyToken,reviewscontroller.FindreviewComment);
// thêm mới
router.post('/api/reviews/',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,reviewscontroller.addreviews);
// sửa
router.put('/api/reviews/:review_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,reviewscontroller.updatereviews);
//xóa
router.delete('/api/reviews/:review_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,reviewscontroller.deletereviews);

module.exports=router;