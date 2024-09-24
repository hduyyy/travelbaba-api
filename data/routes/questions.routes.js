const express=require('express');
const router=express.Router();
const questionscontroller=require('../controller/questions.controller');
router.get('/api/questions',questionscontroller.getallquestions);
module.exports=router;