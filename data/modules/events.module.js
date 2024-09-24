const db=require('../common/connect');
const getallevents=(callback)=>{
    const query='select * from events';
    db.query(query,(err,results)=>{
        if(err)
        {
            callback(err,null)
        }
        callback(null,results);
    });
};
module.exports={getallevents};