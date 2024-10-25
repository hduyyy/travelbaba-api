const express=require('express');
const router=express.Router();
const questionscontroller=require('../controller/questions.controller');
// authmiddlewares.verifyToken phai login,authmiddlewares.AuthAdmin chỉ admin mới được dùng
const authmiddlewares=require('../auth/auth.middlewares');
// lấy all thông tin
router.get('/api/questions',authmiddlewares.verifyToken,questionscontroller.getallquestions);
// lấy theo id
router.get('/api/questions/:id',authmiddlewares.verifyToken,questionscontroller.getallquestionsbyId);
// tìm kiếm câu hỏi question_text
router.post('/api/questions/search',authmiddlewares.verifyToken,questionscontroller.Findquestiontext);
// thêm 
router.post('/api/questions/',authmiddlewares.verifyToken,questionscontroller.addquesitons);
// cập nhật
router.put('/api/questions/:id',authmiddlewares.verifyToken,questionscontroller.updatequesitons);
//xóa
router.delete('/api/questions/:id',authmiddlewares.verifyToken,questionscontroller.deletequesitons);

module.exports=router;