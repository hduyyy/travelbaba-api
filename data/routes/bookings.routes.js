const express=require('express');
const router=express.Router();
const bookingscontroller=require('../controller/bookings.controller');
router.get('/api/bookings',bookingscontroller.getallbookings);
router.get('/api/bookings/:booking_id',bookingscontroller.getallbookingsbyId);
router.post('/api/bookings/',bookingscontroller.addbookings);
router.put('/api/bookings/:booking_id',bookingscontroller.updatebookings);
router.delete('/api/bookings/:booking_id',bookingscontroller.deletebookings);

module.exports=router