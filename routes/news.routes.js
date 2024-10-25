const express=require('express');
const router=express.Router();
const newscontroller=require('../controller/news.controller');
// authmiddlewares.verifyToken phai login,authmiddlewares.AuthAdmin chỉ admin mới được dùng
const authmiddlewares=require('../auth/auth.middlewares');
// lấy all thông tin
router.get('/api/news',authmiddlewares.verifyToken,newscontroller.getallnews);
// lấy thông tin theo id
router.get('/api/news/:news_id',authmiddlewares.verifyToken,newscontroller.getallnewssbyId);
// tìm kiếm theo title
router.post('/api/users/search',authmiddlewares.verifyToken,newscontroller.Findnewtitle);
// lấy đường dẫn ảnh theo id
router.get('/api/news/:news_id/images',authmiddlewares.verifyToken,newscontroller.getallnewsimgbyId);
// thêm mới
router.post('/api/news',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,newscontroller.addnews);
// cập nhật
router.put('/api/news/:news_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,newscontroller.updatenews);
// xóa
router.delete('/api/news/:news_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,newscontroller.deletenews);
module.exports=router;