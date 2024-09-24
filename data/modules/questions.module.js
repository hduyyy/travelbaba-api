const db=require('../common/connect');
const getallquestions=(callback)=>{
    const query='select * from questions';
    db.query(query,(err,results)=>{
        if(err)
        {
            callback(err,null)
        }
        callback(null,results);
    });
};
module.exports={getallquestions};