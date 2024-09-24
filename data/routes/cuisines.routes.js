const express=require('express');
const cuisinescontroller=require('../controller/cuisines.controller');
const router=express.Router();
router.get('/api/cuisines',cuisinescontroller.getallcuisines);
module.exports=router;