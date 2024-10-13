const express=require('express');
const router=express.Router();
const movescontroller=require('../controller/moves.controller');
router.get('/api/moves',movescontroller.getallmoves);
router.get('/api/moves/:moves_id',movescontroller.getallmovesbyId);
module.exports=router;