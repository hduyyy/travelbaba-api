const cuisinesmodule=require('../modules/cuisines.module');
const getallcuisines=(req,res)=>{
    cuisinesmodule.getallcuisines((err,result)=>{
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
module.exports={getallcuisines};