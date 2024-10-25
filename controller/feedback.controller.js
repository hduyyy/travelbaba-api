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
const getallfeedbackbyId=(req,res)=>{
    feedbackmodule.getallfeedbackbyId(req.params.feedback_id,(err,result)=>{
        if(err)
        {
            return res.send("error get feedbacks by id",err);
        }
        if(!result)
        {
            res.send("feedback not found");
        }
        res.json(result);
    });
};
const addfeedbacks=(req,res)=>{
    let submissionDate=req.body.created_at;
    if(submissionDate){submissionDate+='T00:00:00.000Z';}
    else{submissionDate=new Date();}
    const newfeedback={
        user_id:req.body.user_id,
        content:req.body.content,
        created_at:new Date(submissionDate)
    }
    console.log(newfeedback)
    feedbackmodule.addfeedback(newfeedback,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'Error at controller add feedback',error:err});
        }
        res.status(201).json({message:'Add feedback Successful',result});
    });
};
const updatefeedbacks=(req,res)=>{
    console.log('body',req.body);
    let submissionDate=req.body.created_at;
    if(submissionDate){submissionDate+='T00:00:00.000Z';}
    else{submissionDate=new Date();}
    console.log('ngay cap nhat:',submissionDate);
    const update_feedback={
        user_id:req.body.user_id,
        content:req.body.content,
        created_at:new Date(submissionDate)
    }
    console.log('update feedback:',update_feedback);
    feedbackmodule.updatefeedback(req.params.feedback_id,update_feedback,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'Error at controller update feedback',error:err});
        }
        if(result.affectedRows===0)
        {
            return res.status(404).json({message:'Not found'});
        }
        res.status(201).json({message:'Update feedback Successful',result});
    });
};
const deletefeedbacks=(req,res)=>{
    
    feedbackmodule.deletefeedback(req.params.feedback_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'error at controller delete feedback',error:err});
        }
        res.status(201).json({message:'Delete feedback Successfull',result});
    });
}
module.exports={getallfeedback,getallfeedbackbyId,addfeedbacks,updatefeedbacks,deletefeedbacks};