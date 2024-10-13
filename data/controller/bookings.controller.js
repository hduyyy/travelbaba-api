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
const getallbookingsbyId=(req,res)=>{
    bookingsmodule.getallbookingsbyId(req.params.booking_id,(err,result)=>{
        if(err)
        {
            return res.send("error get bookings by id",err);
        }
        if(!result)
        {
            res.send('eror get bookings by id not found');
        }
        res.json(result);
    });  
};

const addbookings=(req,res)=>{
    let submissionDate=req.body.booking_date;
    if(submissionDate){submissionDate+='T00:00:00.000Z';}
    else{submissionDate=new Date();}
    const newbookings={
        user_id:req.body.user_id,
        homestay_id:req.body.homestay_id,
        tour_id:req.body.tour_id,
        booking_date:new Date(submissionDate)
    }
    console.log(newbookings)
    bookingsmodule.addbooking(newbookings,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'Error at controller add bookings',error:err});
        }
        res.status(201).json({code:201,message:'Add bookings Successful',result});
    });
};
const updatebookings=(req,res)=>{
    console.log('body',req.body);
    let submissionDate=req.body.booking_date;
    if(submissionDate){submissionDate+='T00:00:00.000Z';}
    else{submissionDate=new Date();}
    console.log('ngay cap nhat:',submissionDate);
    const update_booking={
        user_id:req.body.user_id,
        homestay_id:req.body.homestay_id,
        tour_id:req.body.tour_id,
        booking_date:new Date(submissionDate)
    }
    console.log('update bookings:',update_booking);
    bookingsmodule.updatebooking(req.params.booking_id,update_booking,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'Error at controller update bookings',error:err});
        }
        if(result.affectedRows===0)
        {
            return res.status(404).json({code:404,message:'Not found'});
        }
        res.status(201).json({code:201,message:'Update Bookings Successful',result});
    });
};
const deletebookings=(req,res)=>{
    bookingsmodule.deletebooking(req.params.booking_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error at controller delete bookings',error:err});
        }
        res.status(201).json({code:201,message:'Delete bookings Successfull',result});
    });
}
module.exports={getallbookings,getallbookingsbyId    ,addbookings,updatebookings,deletebookings };