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
const getallquestionsbyId=(req,res)=>{
    questionsmodule.getallquestionsbyId(req.params.id,(err,result)=>{
        if(err)
        {
            return res.send("error get questionss by id",err);
        }
        if(!result)
        {
            res.send("questions not found");
        }
        res.json(result);
    });
};
const addquesitons=(req,res)=>{
    
    const newquesitons={
        quesiton_text:req.body.quesiton_text,
    }
    console.log(newquesitons)
    questionsmodule.addquesiton(newquesitons,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'Error at controller add quesitons',error:err});
        }
        res.status(201).json({message:'Add quesitons Successful',result});
    });
};
const updatequesitons=(req,res)=>{
    console.log('body',req.body);
    
    const update_quesiton={
        quesiton_text:req.body.quesiton_text,
    }
    console.log('update quesitons:',update_quesiton);
    questionsmodule.updatequesiton(req.params.id,update_quesiton,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'Error at controller update quesitons',error:err});
        }
        if(result.affectedRows===0)
        {
            return res.status(404).json({message:'Not found'});
        }
        res.status(201).json({message:'Update Bookings Successful',result});
    });
};
const deletequesitons=(req,res)=>{
    questionsmodule.deletequesiton(req.params.id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'error at controller delete questions',error:err});
        }
        res.status(201).json({message:'Delete questions Successfull',result});
    });
};
const Findquestiontext=(req,res)=>{
    const {question_text}=req.body;
    if(!question_text)
    {
        return res.status(404).json({code:404, message: "error while input question text" });
    }
    questionsmodule.findquestion_textt(question_text,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "Error find question text ", error:err });
        }
        return res.status(201).json({code:201,message:'Find success', data:result});
    });
};
module.exports={getallquestions,getallquestionsbyId,addquesitons,updatequesitons,deletequesitons,Findquestiontext};