const express=require('express');
const router=express.Router();
const homestayscontroller=require('../controller/homestays.controller');
router.get('/api/homestays',homestayscontroller.getallhomestays);
router.get('/api/homestays/:homestay_id',homestayscontroller.getallhomestaysbyId);
router.post('/api/homestays/',homestayscontroller.addhomestays);
router.put('/api/homestays/:homestay_id',homestayscontroller.updatehomestays);
router.delete('/api/homestays/:homestay_id',homestayscontroller.deletehomestays);


module.exports=router;