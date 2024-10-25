const express = require('express');
const router = express.Router();
const answercontroller=require('../controller/answers.controller');
// authmiddlewares.verifyToken phai login,authmiddlewares.AuthAdmin chỉ admin mới được dùng
const authmiddlewares=require('../auth/auth.middlewares');
//lấy all thông tin
    router.get('/api/answers/',authmiddlewares.verifyToken,answercontroller.getAllAnswers);
    // lấy thông tin theo id
    router.get('/api/answers/:id',authmiddlewares.verifyToken,answercontroller.getallanswersbyId);
    // tìm kiếm answers_text
    router.get('/api/answers/search',authmiddlewares.verifyToken,answercontroller.getallanswersbyText);
    //thêm
    router.post('/api/answers/',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,answercontroller.addanswers);
    //sửa
    router.put('/api/answers/:id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,answercontroller.updateAnswer);
    //xóa
    router.delete('/api/answers/:id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,answercontroller.deleteAnswer);
module.exports=router;