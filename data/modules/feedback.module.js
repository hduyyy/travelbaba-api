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
module.exports={getallfeedback};