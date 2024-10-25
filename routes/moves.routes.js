const express=require('express');
const router=express.Router();
const movescontroller=require('../controller/moves.controller');
// authmiddlewares.verifyToken phai login,authmiddlewares.AuthAdmin chỉ admin mới được dùng
const authmiddlewares=require('../auth/auth.middlewares');
// lấy all 
router.get('/api/moves',movescontroller.getallmoves);
// lấy thông tin theo id
router.get('/api/moves/:moves_id',movescontroller.getallmovesbyId);
// lấy đường dẫn ảnh theo id
router.get('/api/moves/:moves_id/images',authmiddlewares.verifyToken,movescontroller.getallmovesimgbyId);
// tìm kiếm theo title
router.post('/api/moves/search',authmiddlewares.verifyToken,movescontroller.Findmovestitle);
// thêm 
router.post('/api/moves',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,movescontroller.addmoves);
// sửa
router.put('/api/moves/:moves_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,movescontroller.updatemoves);
//xóa
router.delete('/api/moves/:moves_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,movescontroller.deletemoves);
module.exports=router;