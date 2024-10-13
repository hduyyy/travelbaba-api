const express=require('express');
const router=express.Router();
const reviewscontroller=require('../controller/reviews.controller');
router.get('/api/reviews',reviewscontroller.getallreviews);
router.get('/api/reviews/:review_id',reviewscontroller.getallreviewsbyId);
router.post('/api/reviews/',reviewscontroller.addreviews);
router.put('/api/reviews/:review_id',reviewscontroller.updatereviews);
router.delete('/api/reviews/:review_id',reviewscontroller.deletereviews);

module.exports=router;