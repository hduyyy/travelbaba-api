const express=require('express');
const router=express.Router();
const userscontroller=require('../controller/users.controller');
router.get('/api/users',userscontroller.getallusers);
module.exports=router;