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
module.exports={getallreviews};