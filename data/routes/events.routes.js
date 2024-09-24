const express=require('express');
const router=express.Router();
const eventscontroller=require('../controller/events.controller');
router.get('/api/events',eventscontroller.getallevents);
module.exports=router;