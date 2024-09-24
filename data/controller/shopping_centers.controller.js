const shopping_centersmodule=require('../modules/shopping_centers.module');
const getallshopping_centers=(req,res)=>{
    shopping_centersmodule.getallshopping_centers((err,result)=>{
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
module.exports={getallshopping_centers};