const express=require('express');
const router=express.Router();
const bookingscontroller=require('../controller/bookings.controller');
router.get('/api/bookings',bookingscontroller.getallbookings);
module.exports=router