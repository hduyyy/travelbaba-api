const eventsmodule=require('../modules/events.module');
const getallevents=(req,res)=>{
    eventsmodule.getallevents((err,result)=>{
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
module.exports={getallevents};