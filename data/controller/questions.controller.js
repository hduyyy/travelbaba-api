const questionsmodule=require('../modules/questions.module');
const getallquestions=(req,res)=>{
    questionsmodule.getallquestions((err,result)=>{
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
module.exports={getallquestions};