const express=require('express');
const cuisinescontroller=require('../controller/cuisines.controller');
const authmiddlewares=require('../auth/auth.middlewares');
const router=express.Router();
router.get('/api/cuisines',authmiddlewares.verifyToken,cuisinescontroller.getallcuisines);
router.get('/api/cuisines/:cuisines_id',authmiddlewares.verifyToken,cuisinescontroller.getallcuisinesbyId);
router.get('/api/cuisines/:cuisines_id/images',authmiddlewares.verifyToken,cuisinescontroller.getallcuisinesimgbyId);
router.get('/api/tours/search',authmiddlewares.verifyToken,cuisinescontroller.Findcuisinestitle);
router.post('/api/cuisines',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,cuisinescontroller.addcuisine);
router.put('/api/cuisines/:cuisines_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,cuisinescontroller.updatecuisines);
router.delete('/api/cuisines/:cuisines_id',authmiddlewares.verifyToken,authmiddlewares.AuthAdmin,cuisinescontroller.deletecuisines);
module.exports=router