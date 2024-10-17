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
const getallmovesbyId=(moves_id,callback)=>{
    const query='select * from moves where moves_id=?';
    db.query(query,[moves_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const addmove=(move,callback)=>{
    const query='insert into moves (title,address,description,type_vehicle,moves_image,content_image) values (?,?,?,?,?,?)';
    db.query(query,[move.title,move.address,move.description,move.type_vehicle,move.moves_image,move.content_image],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updatemove=(moves_id,move,callback)=>{
    const query='update moves set title=?,address=?,description=?,type_vehicle=?,moves_image=?,content_image=? where moves_id=?';
    db.query(query,[move.title,move.address,move.description,move.type_vehicle,move.moves_image,move.content_image,moves_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const deletemove=(move_id,callback)=>{
    const query='delete from moves where move_id=?';
    db.query(query,move_id,(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const getallmoveimagesbyid=(moves_id,callback)=>{
    const query='select moves_image,content_image from moves where moves_id=?'
    db.query(query,[moves_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const findmovestitle=(title,callback)=>{
    const query='select * from moves where title like ?';
    db.query(query,[`%${title}%`],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);

    });
};
module.exports={getallmoves,getallmovesbyId,addmove,updatemove,deletemove,getallmoveimagesbyid,findmovestitle};