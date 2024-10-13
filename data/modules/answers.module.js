const db=require('../common/connect');
const getAllAnswers = (callback) => {
    const query = 'SELECT * FROM answers';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
const getallanswersbyId=(id,callback)=>{
    const query='select * from answers where id=?';
    db.query(query,[id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const getallanswersbyText=(answer_text,result)=>
{
    const query='select * from answers where answer_text like ?';
     const search_answers_text='%${answer_text}';
    db.query(query,[search_answers_text],(err,res)=>{
        if(err)
        {
            console.log("error: ", err);
            return result(err,null);
        }
        if(!res.length)
        {
            console.log("found answers_text not found:")
            return (res,null)
        }
        result(null,res);
    });
};
const addAnswer = (answer, callback) => {
    const query = `INSERT INTO Answers (question_id, answer_text, correctness) VALUES (?, ?, ?)`;
    db.query(query, [answer.question_id, answer.answer_text, answer.correctness], (err, result) => {
      if (err) {
       return callback(err, null);
      } else {
        callback(null, result);
      }
    });
  };
const updateAnswer=(id,answer,callback)=>{
    const query='update answers set question_id=?,answer_text=?,correctness=? where id=?';
    db.query(query,[answer.question_id, answer.answer_text, answer.correctness,id],(err,result)=>{
        if(err)
        {
            console.log("error at module update answers");
           return callback(err,null);
        }
        callback(result,null);
    });
};
const deleteanswer=(id,callback)=>{
    const query='delete from answers where id=?';
    db.query(query,[id],(err,result)=>{
        if(err)
        {
            console.log("error at module delete answers");
        return callback(err,null);
        }
        callback(null,result);
        
    });
};
module.exports={getAllAnswers,getallanswersbyId,getallanswersbyText,addAnswer,updateAnswer,deleteanswer};