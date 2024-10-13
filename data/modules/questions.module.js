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
const getallquestionsbyId=(id,callback)=>{
    const query='select * from questions where id=?';
    db.query(query,[id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const addquesiton=(quesitons,callback)=>{
    const query='insert into quesitons (quesiton_text) values (?)';
    db.query(query,[quesitons.quesiton_text],(err,result)=>{
        if(err)
        {         
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updatequesiton=(id,quesitons,callback)=>{
    const query='update quesitons set quesiton_text=?  where id=?';
    db.query(query,[quesitons.quesiton_text,id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const deletequesiton=(id,callback)=>{
    const query='delete from quesitons where id=?';
    db.query(query,[id],(err,result)=>{
        if(err)
        {
            console.log("error at module delete questions");
        return callback(err,null);
        }
        callback(null,result);
        
    });
};
module.exports={getallquestions,getallquestionsbyId,addquesiton,updatequesiton,deletequesiton};