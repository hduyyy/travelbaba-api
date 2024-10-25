const db=require('../common/connect');
const getallreviews=(callback)=>{
    const query='select * from reviews';
    db.query(query,(err,results)=>{
        if(err)
        {
            callback(err,null)
        }
        callback(null,results);
    });
};
const getallreviewsbyId=(review_id,callback)=>{
    const query='select * from reviews where review_id=?';
    db.query(query,[review_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const addreview=(reviews,callback)=>{
    const query='insert into reviews (user_id,homestay_id,event_id,news_id,tour_id,shopping_center_id,moves_id,cuisines_id,comment,rating) values (?,?,?,?,?,?,?,?,?,?)';
    db.query(query,[reviews.user_id,reviews.homestay_id,reviews.event_id,reviews.news_id,reviews.tour_id,reviews.shopping_center_id,reviews.moves_id,reviews.cuisines_id,reviews.comment,reviews.rating],(err,result)=>{
        if(err)
        {         
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updatereview=(review_id,reviews,callback)=>{
    const query='update reviews set user_id=?,homestay_id=?,event_id=?,news_id=?,tour_id=?,shopping_center_id=?,moves_id=?,cuisines_id=?,comment=?,rating=? where review_id=?';
    db.query(query,[reviews.user_id,reviews.homestay_id,reviews.event_id,reviews.news_id,reviews.tour_id,reviews.shopping_center_id,reviews.moves_id,reviews.cuisines_id,reviews.comment,reviews.rating,review_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const deletereview=(review_id,callback)=>{
    const query='delete from reviews where  review_id=?';
    db.query(query,[review_id],(err,result)=>{
        if(err)
        {
            console.log("error at module delete reviews");
        return callback(err,null);
        }
        callback(null,result);
        
    });
};
const findreviewcomment=(comment,callback)=>{
    const query='select * from reviews where comment COLLATE utf8mb4_unicode_ci like ?';
    db.query(query,[`%${comment}%`],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);

    });
};
module.exports={getallreviews,getallreviewsbyId,addreview,updatereview,deletereview,findreviewcomment};