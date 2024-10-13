const db=require('../common/connect');
const getallfeedback=(callback)=>{
    const query='select * from feedback';
    db.query(query,(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result);
    });
};
const getallfeedbackbyId=(feedback_id,callback)=>{
    const query='select * from feedback where feedback_id=?';
    db.query(query,[feedback_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const addfeedback=(feedback,callback)=>{
    const query='insert into feedback (user_id,content,created_at) values (?,?,?)';
    db.query(query,[feedback.user_id,feedback.content,feedback.created_at],(err,result)=>{
        if(err)
        {         
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updatefeedback=(feedback_id,feedback,callback)=>{
    const query='update feedback set user_id=?,content=?,created_at=? where feedback_id=?';
    db.query(query,[feedback.user_id,feedback.content,feedback.created_at,feedback_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const deletefeedback=(feedback_id,callback)=>{
    const query='delete from feedback where  feedback_id=?';
    db.query(query,[feedback_id],(err,result)=>{
        if(err)
        {
            console.log("error at module delete feedback");
        return callback(err,null);
        }
        callback(null,result);
        
    });
};
module.exports={getallfeedback,getallfeedbackbyId,addfeedback,updatefeedback,deletefeedback};