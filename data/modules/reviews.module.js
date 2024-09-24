const db=require('../common/connect');
const getallreviews=(callback)=>{
    const query='select * from reviews';
    db.query(query,(err,results)=>{
        if(err)
        {
            callback(err,null)
        }
        callback(null,results);
    });
};
module.exports={getallreviews};