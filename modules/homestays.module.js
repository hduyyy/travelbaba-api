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
const getallhomestaysbyId=(hometay_id,callback)=>{
    const query='select * from homestays where homestay_id=?';
    db.query(query,[hometay_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const addhomestay=(homestays,callback)=>{
    const query='insert into homestays (title,address,description,price,type_bed,created_at,updated_at,room) values (?,?,?,?,?,?,?,?)';
    db.query(query,[homestays.title,homestays.address,homestays.description,homestays.price,homestays.type_bed,homestays.created_at,homestays.updated_at,homestays.room],(err,result)=>{
        if(err)
        {         
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updatehomestay=(homestay_id,homestays,callback)=>{
    const query='update homestays set title=?,address=?,description=?,price=?,type_bed=?,created_at=?,updated_at=?,room=? where homestay_id=?';
    db.query(query,[homestays.title,homestays.address,homestays.description,homestays.price,homestays.type_bed,homestays.created_at,homestays.updated_at,homestays.room,homestay_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const deletehomestay=(homestay_id,callback)=>{
    const query='delete from homestays where  homestay_id=?';
    db.query(query,[homestay_id],(err,result)=>{
        if(err)
        {
            console.log("error at module delete answers");
        return callback(err,null);
        }
        callback(null,result);
        
    });
};
const findhomestaytitle=(title,callback)=>{
    const query='select * from homestays where title COLLATE utf8mb4_unicode_ci like ?';
    db.query(query,[`%${title}%`],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);

    });
};
module.exports={getallhomestays,getallhomestaysbyId,addhomestay,updatehomestay,deletehomestay,findhomestaytitle};