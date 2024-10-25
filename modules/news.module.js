const db=require('../common/connect');
const getallnews=(callback)=>{
    const query='select * from news';
    db.query(query,(err,results)=>{
        if(err)
        {
            callback(err,null)
        }
        callback(null,results);
    });
};
const getallnewsbyId=( news_id,callback)=>{
    const query='select * from news where news_id=?';
    db.query(query,[ news_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const Addnews=(news,callback)=>{
    const query='insert into news (title,content,description,views,news_image,content_image) values (?,?,?,?,?,?)';
    db.query(query,[news.title,news.content,news.description,news.views,news.news_image,news.content_image],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updatenews=(news_id,news,callback)=>{
    const query='update news set title=?,content=?,description=?,views=?,news_image=?,content_image=? where news_id=?';
    db.query(query,[news.title,news.content,news.description,news.views,news.news_image,news.content_image,news_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const deletenews=(news_id,callback)=>{
    const query='delete from news where news_id=?';
    db.query(query,news_id,(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
}
const getallnewsimagesbyid=(news_id,callback)=>{
    const query='select news_image,content_image from news where news_id=?'
    db.query(query,[news_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const findnewstitle=(title,callback)=>{
    const query='select * from news where title COLLATE utf8mb4_unicode_ci like ?';
    db.query(query,[`%${title}%`],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);

    });
};
module.exports={getallnews,getallnewsbyId,Addnews,updatenews,deletenews,getallnewsimagesbyid,findnewstitle};