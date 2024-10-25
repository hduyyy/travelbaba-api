const bookingsmodule=require('../modules/bookings.module');
const emailservices=require('../common/email.services');
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
    console.log("id user:",req.user.id);
    const newbookings={
        user_id:req.user.id,
        homestay_id:req.body.homestay_id,
        tour_id:req.body.tour_id
    }
    console.log(newbookings)
    bookingsmodule.addbooking(newbookings,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'Error at controller add bookings',error:err});
        }
        res.status(201).json({code:201,message:'Add bookings Successful,Please wait for admin to confirm ',result});
    });
};
const approveBooking=(req,res)=>{
    if(!['Đã duyệt'],['Không duyệt'].includes(req.body.status))
    {
        return res.status(404).json({code:404,message:'Error status'});
    }
    bookingsmodule.updatebookingstatus(req.body.booking_id,req.body.status,(err,result)=>{
        if(err)
        {
            return res.status(404).json({code:404,message:'Error update bookings status'});
        }
        bookingsmodule.bookingDeaital(req.body.booking_id,(err,result)=>{
            if(err)
            {
                return res.status(500).json({code:500,message:'Error get booking detail'});
            }
            console.log(result);
            if(!result||!result.email)
            {
                return res.status(404).json({code:404,message:'bookings deitail not found '});
            }
            emailservices.sendBookingInfor(result.email,{
                homestay_name:result.homestay_name||'Homestay a',
                tour_name:result.tour_name||'Tour a',
                booking_date:result.booking_date
            });
            return res.status(201).json({code:201,message:'Update booking status ${req.body.status}. confirm Email has been sent'})
        })  ;   
    })
}

const deletebookings=(req,res)=>{
    bookingsmodule.deletebooking(req.params.booking_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'error at controller delete bookings',error:err});
        }
        res.status(201).json({code:201,message:'Delete bookings Successfull',result});
    });
}
module.exports={getallbookings,getallbookingsbyId    ,addbookings,deletebookings,approveBooking };