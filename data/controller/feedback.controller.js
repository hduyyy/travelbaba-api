const feedbackmodule=require('../modules/feedback.module');
const getallfeedback=(req,res)=>{
    feedbackmodule.getallfeedback((err,result)=>{
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
module.exports={getallfeedback};