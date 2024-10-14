const express=require('express');
const router=express.Router();
const userscontroller=require('../controller/users.controller');
router.get('/api/users',userscontroller.getallusers);
router.get('/api/users/search',userscontroller.Findfullname);
router.get('/api/users/:user_id',userscontroller.getalluserssbyId);
router.post('/api/users/',userscontroller.addusers);
router.put('/api/users/:user_id',userscontroller.updateusers);
router.delete('/api/users/:user_id',userscontroller.deleteusers);

module.exports=router;