const db=require('../common/connect');
const getallnews=(callback)=>{
    const query='select * from news';
    db.query(query,(err,results)=>{
        if(err)
        {
            callback(err,null)
        }
        callback(null,results);
    });
};
module.exports={getallnews};