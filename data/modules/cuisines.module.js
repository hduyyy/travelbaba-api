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
const getallcuisinesbyId=(cuisines_id,callback)=>{
    const query='select * from cuisines where cuisines_id=?';
    db.query(query,[cuisines_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const addcuisines=(cuisine,callback)=>{
    const query='insert into cuisines (title,address,description,closing_time,opening_hours,cuisines_image,content_image) values (?,?,?,?,?,?,?)';
    db.query(query,[cuisine.title,cuisine.address,cuisine.description,cuisine.closing_time,cuisine.opening_hours,cuisine.cuisines_image,cuisine.content_image],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updatecuisines=(cuisines_id,cuisine,callback)=>{
    const query='update cuisines set title=?,address=?,description=?,closing_time=?,opening_hours=?,cuisines_image=?,content_image=? where cuisines_id=?';
    db.query(query,[cuisine.title,cuisine.address,cuisine.description,cuisine.closing_time,cuisine.opening_hours,cuisine.cuisines_image,cuisine.content_image,cuisines_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const deletecuisines=(cuisines_id,callback)=>{
    const query='delete from cuisines where cuisines_id=?';
    db.query(query,cuisines_id,(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const getallcuisinesimagesbyid=(cuisines_id,callback)=>{
    const query='select cuisines_image,content_image from cuisines where cuisines_id=?'
    db.query(query,[cuisines_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
}
module.exports={getallcuisines,getallcuisinesbyId,addcuisines,getallcuisinesimagesbyid,updatecuisines,deletecuisines
};