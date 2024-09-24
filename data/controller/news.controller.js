const newsmodule=require('../modules/news.module');
const getallnews=(req,res)=>{
    newsmodule.getallnews((err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.json(result);
        }
    });
};
module.exports={getallnews};