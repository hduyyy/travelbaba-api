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
const getallbookingsbyId=(booking_id,callback)=>{
    const query='select * from bookings where booking_id=?';
    db.query(query,[booking_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const addbooking=(bookings,callback)=>{
    const query='insert into bookings (user_id,homestay_id,tour_id,booking_date) values (?,?,?,?)';
    db.query(query,[bookings.user_id,bookings.homestay_id,bookings.tour_id,bookings.booking_date],(err,result)=>{
        if(err)
        {         
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updatebooking=(booking_id,bookings,callback)=>{
    const query='update bookings set user_id=?,homestay_id=?,tour_id=?,booking_date=? where booking_id=?';
    db.query(query,[bookings.user_id,bookings.homestay_id,bookings.tour_id,bookings.booking_date,booking_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const deletebooking=(booking_id,callback)=>{
    const query='delete from bookings where  booking_id=?';
    db.query(query,[booking_id],(err,result)=>{
        if(err)
        {
            console.log("error at module delete bookings");
        return callback(err,null);
        }
        callback(null,result);
        
    });
};
module.exports={getallbookings,
                getallbookingsbyId,addbooking,updatebooking,deletebooking
};