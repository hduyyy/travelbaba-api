const toursmodule=require('../modules/tours.module');
const getalltours=(req,res)=>{
    toursmodule.getalltours((err,result)=>{
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
module.exports={getalltours};