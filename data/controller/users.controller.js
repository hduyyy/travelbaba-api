const usersmodule=require('../modules/users.module');
const getallusers=(req,res)=>{
    usersmodule.getallusers((err,result)=>{
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
module.exports={getallusers};