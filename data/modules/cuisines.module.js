const db =require('../common/connect');
const getallcuisines=(callback)=>{
    const query='select * from cuisines';
    db.query(query,(err,result)=>{
        if(err){
            return callback(err,null);
        }
        callback(null,result);
    });
};
module.exports={getallcuisines};