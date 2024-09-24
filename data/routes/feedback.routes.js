const express=require('express');
const router=express.Router();
const feedbackcontroller=require('../controller/feedback.controller');
router.get('/api/feedback',feedbackcontroller.getallfeedback);
module.exports=router;