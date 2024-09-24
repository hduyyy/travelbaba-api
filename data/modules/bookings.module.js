const db=require('../common/connect');
const getallbookings=(callback)=>{
    const query='select * from bookings';
    db.query(query,(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result);
    });
};
const getbookingsbyId=(id,callback)=>{
    const query='select * from bookings where id =?';
    db.query(query,[id],(err,result)=>{
        if(err)
        callback(err,result);
        
    });
;}
module.exports={getallbookings,
                getbookingsbyId
};