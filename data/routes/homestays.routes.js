const express=require('express');
const router=express.Router();
const homestayscontroller=require('../controller/homestays.controller');
router.get('/api/homestays',homestayscontroller.getallhomestays);
module.exports=router;