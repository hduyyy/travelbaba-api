const express=require('express');
const router=express.Router();
const newscontroller=require('../controller/news.controller');
router.get('/api/news',newscontroller.getallnews);
module.exports=router;