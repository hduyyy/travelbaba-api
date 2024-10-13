const express=require('express');
const cuisinescontroller=require('../controller/cuisines.controller');
const router=express.Router();
router.get('/api/cuisines',cuisinescontroller.getallcuisines);
router.get('/api/cuisines/:cuisines_id',cuisinescontroller.getallcuisinesbyId);
router.get('/api/cuisines/:cuisines_id/images',cuisinescontroller.getallcuisinesimgbyId);
router.post('/api/cuisines',cuisinescontroller.addcuisine);
router.put('/api/cuisines/:cuisines_id',cuisinescontroller.updatecuisines);
router.delete('/api/cuisines/:cuisines_id',cuisinescontroller.deletecuisines);
module.exports=router