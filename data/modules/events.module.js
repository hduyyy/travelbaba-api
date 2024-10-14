const db=require('../common/connect');
const getallevents=(callback)=>{
    const query='select * from events';
    db.query(query,(err,results)=>{
        if(err)
        {
            callback(err,null)
        }
        callback(null,results);
    });
};
const getalleventsbyId=(event_id,callback)=>{
    const query='select * from events where event_id=?';
    db.query(query,[event_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const addevent=(event,callback)=>{
    const query='insert into events (title,description,closing_time_event,opening_hours_event,views,content,event_image,content_image) values (?,?,?,?,?,?,?,?)';
    db.query(query,[event.title,event.description,event.closing_time_event,event.opening_hours_event,event.views,event.content,event.event_image,event.content_image],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updateevent=(event_id,event,callback)=>{
    const query='update events set title=?,address=?,description=?,closing_time=?,opening_hours=?,event_image=?,content_image=? where event_id=?';
    db.query(query,[event.title,event.description,event.closing_time_event,event.opening_hours_event,event.views,event.content,event.event_image,event.content_image,event_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const deleteevent=(event_id,callback)=>{
    const query='delete from events where event_id=?';
    db.query(query,event_id,(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const getalleventimagesbyid=(event_id,callback)=>{
    const query='select event_image,content_image from events where event_id=?'
    db.query(query,[event_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const findeventstitle=(title,callback)=>{
    const query='select * from events where title like ?';
    db.query(query,[`%${title}%`],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);

    });
};
module.exports={getallevents,getalleventsbyId,addevent,updateevent,deleteevent,getalleventimagesbyid,findeventstitle};