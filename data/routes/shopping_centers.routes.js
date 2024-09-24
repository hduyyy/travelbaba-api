const express=require('express');
const router=express.Router();
const shopping_centerscontroller=require('../controller/shopping_centers.controller');
router.get('/api/shopping_centers',shopping_centerscontroller.getallshopping_centers);
module.exports=router;