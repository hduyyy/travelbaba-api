const answermodule=require('../modules/answers.module');
const getAllAnswers = (req, res) => {
    answermodule.getAllAnswers((err, results) => {
        if (err) {
            res.status(500).json({code:500, message:'error get answers controller',err});
        } else {
            res.status(201).json({code:201, message:' get answers controller successful',results});
        }
    });
};
const getallanswersbyId=(req,res)=>{
    answermodule.getallanswersbyId(req.params.id,(err,result)=>{
        if(err)
        {
            res.status(500).json({code:500, message:'error get answers by id controller',err}); 
        }
        if(!result)
        {
            res.status(404).json({code:404, message:'not found get answers by id controller',err}); 
        }
        res.status(201).json({code:201, message:' get answers by id controller successful',result}); 

    });
};
const getallanswersbyText=(req,res)=>{
    const answer_text=req.query.text;
    if(!answer_text)
    {
       return res.send("error find")
    }
    answermodule.getallanswersbyText(answer_text,(err,result)=>{
        if(err)
        {
            return res.send('error get all answers by text');
        }
        if(!result)
        {
            return res.send('answers text not found');
        }
        res.json({answers:result});
    });
}
const addanswers=(req,res)=>{
    const newAnswer={
        question_id:req.body.question_id,
        answer_text:req.body.answer_text,
        correctness:req.body.correctness
    };
    console.log(newAnswer);
    answermodule.addAnswer(newAnswer,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: 'Error adding answers', error: err });
        }
        res.status(201).json({code:201, message: 'Add Successful', result });
    });
};
const updateAnswer=(req,res)=>{
    const updateanswer={
        question_id:req.body.question_id,
        answer_text:req.body.answer_text,
        correctness:req.body.correctness
    };
    console.log("Updating Answers: ",updateanswer);
    answermodule.updateAnswer(req.params.id,updateanswer,(err,result)=>{
        if(err)
        {
           return res.status(500).json({code:500,message:'Error at controller update answers',error:err});
        }
        if(result.affectedRows ===0)
        {
            return res.status(404).json({code:404,message:"Answers not found at controller update answers"});
        }
         res.status(201).json({code:201,message:'Update Answer Successful',result});
         console.log(result);
         console.log("Update answers Successfull");
    });
};
const deleteAnswer=(req,res)=>{
    answermodule.deleteanswer(req.params.id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error at controller delete answers',error:err});
        }
        res.status(201).json({code:201,message:'Delete answers Successfull',result});
    });
}
module.exports={getAllAnswers,
        getallanswersbyId,
        getallanswersbyText,addanswers,updateAnswer,deleteAnswer
};