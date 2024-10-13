const express=require('express');
const router=express.Router();
const questionscontroller=require('../controller/questions.controller');
router.get('/api/questions',questionscontroller.getallquestions);
router.get('/api/questions/:id',questionscontroller.getallquestionsbyId);
router.post('/api/questions/',questionscontroller.addquesitons);
router.put('/api/questions/:id',questionscontroller.updatequesitons);
router.delete('/api/questions/:id',questionscontroller.deletequesitons);

module.exports=router;