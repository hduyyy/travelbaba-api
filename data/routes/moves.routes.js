const express=require('express');
const router=express.Router();
const movescontroller=require('../controller/moves.controller');
router.get('/api/moves',movescontroller.getallmoves);
module.exports=router;