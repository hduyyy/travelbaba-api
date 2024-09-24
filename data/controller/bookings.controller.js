const bookingsmodule=require('../modules/bookings.module');
const getallbookings=(req,res)=>{
    bookingsmodule.getallbookings((err,result)=>{
        if(err)
        {
            console.log("error bookings",err);
        }
        
        else{
            res.json(result);
        } 
    });
};
const getbookingsbyId=(req,res)=>{
    const id=req.params.id;
    bookingsmodule.getbookingsbyId(id,(err,result)=>{
        if(err)
        {
            console.log("error",err);
        }
        else
        {
            res.json(result[0]);
        }
    })
}
module.exports={getallbookings,
        getbookingsbyId
};