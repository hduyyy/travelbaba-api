const db=require('../common/connect');
const getallmoves=(callback)=>{
    const query='select * from moves';
    db.query(query,(err,results)=>{
        if(err)
        {
            callback(err,null)
        }
        callback(null,results);
    });
};
module.exports={getallmoves};