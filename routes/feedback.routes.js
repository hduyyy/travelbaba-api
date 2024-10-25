const express=require('express');
const router=express.Router();
const feedbackcontroller=require('../controller/feedback.controller');
router.get('/api/feedback',feedbackcontroller.getallfeedback);
router.get('/api/feedback/:feedback_id',feedbackcontroller.getallfeedbackbyId)
router.post('/api/feedback',feedbackcontroller.addfeedbacks);
router.put('/api/:id',feedbackcontroller.updatefeedbacks);
router.delete('/api/:feedback_id',feedbackcontroller.deletefeedbacks);
module.exports=router;