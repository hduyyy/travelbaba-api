const db=require('../common/connect');
const getalltours = (callback) => {
    const query = 'SELECT * FROM tours';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
const getalltoursbyId=(tour_id,callback)=>{
    const query='select * from tours where tour_id=?';
    db.query(query,[tour_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const addtour=(tour,callback)=>{
    const query='insert into tours (title,description,price,address,vehicle,members,tour_date,tour_image,content_image1,content_image2) values (?,?,?,?,?,?,?,?,?,?)';
    db.query(query,[tour.title,tour.description,tour.price,tour.address,tour.vehicle,tour.members,tour.tour_date,tour.tour_image,tour.content_image1,tour.content_image2],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updatetour=(tour_id,tour,callback)=>{
    const query='update tours set title=?,description=?,price=?,address=?,vehicle=?,members=?,tour_date=?,tour_image=?,content_image1=?,content_image2=? where tour_id=?';
    db.query(query,[tour.title,tour.description,tour.price,tour.address,tour.vehicle,tour.members,tour.tour_date,tour.tour_image,tour.content_image1,tour.content_image2,tour_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const deletetour=(tour_id,callback)=>{
    const query='delete from tours where tour_id=?';
    db.query(query,[tour_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const getalltourimagesbyid=(tour_id,callback)=>{
    const query='select tour_image,content_image1,content_image2 from tours where tour_id=?'
    db.query(query,[tour_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const findtourtitle=(title,callback)=>{
    const query='select * from tours where title utf8mb4_unicode_ci like ?';
    db.query(query,[`%${title}%`],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);

    });
};
module.exports={getalltours,getalltoursbyId,addtour,updatetour,deletetour,getalltourimagesbyid,findtourtitle};