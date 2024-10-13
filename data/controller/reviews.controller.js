const reviewsmodule=require('../modules/reviews.module');
const getallreviews=(req,res)=>{
    reviewsmodule.getallreviews((err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.json(result);
        }
    });
};
const getallreviewsbyId=(req,res)=>{
    reviewsmodule.getallreviewsbyId(req.params.review_id,(err,result)=>{
        if(err)
        {
            return res.send("error get reviewss by id",err);
        }
        if(!result)
        {
            res.send("reviews not found");
        }
        res.json(result);
    });
};
const addreviews=(req,res)=>{
    let submissionDate=req.body.created_at;
    if(submissionDate){submissionDate+='T00:00:00.000Z';}
    else{submissionDate=new Date();}
    const newreviews={
        user_id:req.body.user_id,
        homestay_id:req.body.homestay_id,
        event_id:req.body.event_id,
        news_id:req.body.news_id,
        tour_id:req.body.tour_id,
        comment:req.body.comment,
        rating:req.body.rating,
        created_at:new Date(submissionDate)
    }
    console.log(newreviews)
    reviewsmodule.addreview(newreviews,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'Error at controller add reviews',error:err});
        }
        res.status(201).json({message:'Add reviews Successful',result});
    });
};
const updatereviews=(req,res)=>{
    console.log('body',req.body);
    let submissionDate=req.body.created_at;
    if(submissionDate){submissionDate+='T00:00:00.000Z';}
    else{submissionDate=new Date();}
    console.log('ngay cap nhat:',submissionDate);
    const update_review={
        user_id:req.body.user_id,
        homestay_id:req.body.homestay_id,
        event_id:req.body.event_id,
        news_id:req.body.news_id,
        tour_id:req.body.tour_id,
        comment:req.body.comment,
        rating:req.body.rating,
        created_at:new Date(submissionDate)
    }
    console.log('update reviews:',update_review);
    reviewsmodule.updatereview(req.params.review_id,update_review,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'Error at controller update reviews',error:err});
        }
        if(result.affectedRows===0)
        {
            return res.status(404).json({message:'Not found'});
        }
        res.status(201).json({message:'Update Bookings Successful',result});
    });
};
const deletereviews=(req,res)=>{
    reviewsmodule.deletereview(req.params.review_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'error at controller delete reviews',error:err});
        }
        res.status(201).json({message:'Delete reviews Successfull',result});
    });
}
module.exports={getallreviews,getallreviewsbyId,addreviews,updatereviews,deletereviews};