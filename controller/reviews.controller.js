const reviewsmodule=require('../modules/reviews.module');
const getallreviews=(req,res)=>{
    reviewsmodule.getallreviews((err,result)=>{
        if(err)
        {
            res.status(500).json({code:500,message:'Error get all controller reviews',err});
        }          
            return res.status(201).json({code:201,message:'Successfull',result});
    });
};
const getallreviewsbyId=(req,res)=>{
    reviewsmodule.getallreviewsbyId(req.params.review_id,(err,result)=>{
        if(err)
        {
            res.status(500).json({code:500,message:'Error get all by id controller reviews',err});
        }
        if(!result)
        {
            res.status(404).json({code:404,message:'reviews not found',err});
        }
        res.status(201).json({code:201,message:'Successfull',result});
    });
};
const addreviews=(req,res)=>{
    const newreviews={
        user_id:req.body.user_id,
        homestay_id:req.body.homestay_id,
        event_id:req.body.event_id,
        news_id:req.body.news_id,
        news_id:req.body.news_id,
        tour_id:req.body.tour_id,
        shopping_center_id:req.body.shopping_center_id,
        moves_id:req.body.moves_id,
        cuisines_id:req.body.cuisines_id,
        comment:req.body.comment,
        rating:req.body.rating
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
    const update_review={
        user_id:req.body.user_id,
        homestay_id:req.body.homestay_id,
        event_id:req.body.event_id,
        news_id:req.body.news_id,
        news_id:req.body.news_id,
        tour_id:req.body.tour_id,
        shopping_center_id:req.body.shopping_center_id,
        moves_id:req.body.moves_id,
        cuisines_id:req.body.cuisines_id,
        comment:req.body.comment,
        rating:req.body.rating
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
        res.status(201).json({message:'Update reviews Successful',result});
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
    const FindreviewComment=(req,res)=>{
        const {comment}=req.body;
        if(!comment)
        {
            return res.status(404).json({code:404, message: "error while input comments title" });
        }
        reviewsmodule.findreviewcomment(comment,(err,result)=>{
            if(err)
            {
                return res.status(500).json({code:500, message: "Error find reviews comments", error:err });
            }
            return res.status(201).json({code:201,message:'Find success', data:result});
        });
    };
module.exports={getallreviews,getallreviewsbyId,addreviews,updatereviews,deletereviews,FindreviewComment};