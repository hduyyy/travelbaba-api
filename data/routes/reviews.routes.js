const express=require('express');
const router=express.Router();
const reviewscontroller=require('../controller/reviews.controller');
router.get('/api/reviews',reviewscontroller.getallreviews);
module.exports=router;