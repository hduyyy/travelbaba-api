const homestaysmodule=require('../modules/homestays.module');
const getallhomestays=(req,res)=>{
    homestaysmodule.getallhomestays((err,result)=>{
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
module.exports={getallhomestays};