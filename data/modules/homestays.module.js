const db=require('../common/connect');
const getallhomestays=(callback)=>{
    const query='select * from homestays';
    db.query(query,(err,results)=>{
        if(err)
        {
            callback(err,null)
        }
        callback(null,results);
    });
};
module.exports={getallhomestays};