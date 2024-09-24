const express=require('express');
const router=express.Router();
const tourscontroller=require('../controller/tours.controller');
router.get('/api/tours',tourscontroller.getalltours);
module.exports=router;