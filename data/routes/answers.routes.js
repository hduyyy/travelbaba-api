const express = require('express');
const router = express.Router();
const answercontroller=require('../controller/answers.controller');
    router.get('/api/answers',answercontroller.getAllAnswers);
module.exports=router;