const db=require('../common/connect');
const getallshopping_centers = (callback) => {
    const query = 'SELECT * FROM shopping_centers';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
const getallshopping_centersbyId=(shopping_center_id,callback)=>{
    const query='select * from shopping_centers where shopping_center_id=?';
    db.query(query,[shopping_center_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const addshopping_center=(shopping_center,callback)=>{
    const query='insert into shopping_centers (title,address,description,closing_time,opening_hours,type,shopping_center_image,content_image) values (?,?,?,?,?,?,?,?)';
    db.query(query,[shopping_center.title,shopping_center.address,shopping_center.description,shopping_center.closing_time,shopping_center.opening_hours,shopping_center.type,shopping_center.shopping_center_image,shopping_center.content_image],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updateshopping_center=(shopping_center_id,shopping_center,callback)=>{
    const query='update shopping_centers set title=?,address=?,description=?,closing_time=?,opening_hours=?,type=?,shopping_center_image=?,content_image=? where shopping_center_id=?';
    db.query(query,[shopping_center.title,shopping_center.address,shopping_center.description,shopping_center.closing_time,shopping_center.opening_hours,shopping_center.type,shopping_center.shopping_center_image,shopping_center.content_image,shopping_center_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const deleteshopping_center=(shopping_center_id,callback)=>{
    const query='delete from shopping_centers where shopping_center_id=?';
    db.query(query,shopping_center_id,(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const getallshopping_centerimagesbyid=(shopping_center_id,callback)=>{
    const query='select shopping_center_image,content_image from shopping_centers where shopping_center_id=?'
    db.query(query,[shopping_center_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const findshopping_centerstitle=(title,callback)=>{
    const query='select * from shopping_centers where title COLLATE utf8mb4_unicode_ci like ?';
    db.query(query,[`%${title}%`],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);

    });
};
module.exports={getallshopping_centers,getallshopping_centersbyId,addshopping_center,updateshopping_center,deleteshopping_center,getallshopping_centerimagesbyid,findshopping_centerstitle};