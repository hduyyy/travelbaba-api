const homestaysmodule=require('../modules/homestays.module');
const getallhomestays=(req,res)=>{
    homestaysmodule.getallhomestays((err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.json(result);
        }
    });
};const getallhomestaysbyId=(req,res)=>{
    homestaysmodule.getallhomestaysbyId(req.params.homestay_id,(err,result)=>{
        if(err)
        {
            return res.send("error get homestayss by id",err);
        }
        if(!result)
        {
            res.send("homestays not found");
        }
        res.json(result);
    });
};

const addhomestays=(req,res)=>{
    let created_at=req.body.created_at;
    let updated_at=req.body.updated_at;
    if(updated_at && created_at)
        {
            updated_at+='T00:00:00.000Z';
            created_at+='T00:00:00.000Z';
        }
    else{
        updated_at=new Date();
        created_at=new Date();

    }
    const newhomestays={
        title:req.body.title,
        address:req.body.address,
        description:req.body.description,
        price:parseFloat(req.body.price),
        type_bed:req.body.type_bed,
        created_at:new Date(created_at),
        updated_at:new Date(updated_at),
        room:Boolean(req.body.room)
    }
    console.log(newhomestays)
    homestaysmodule.addhomestay(newhomestays,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'Error at controller add homestays',error:err});
        }
        res.status(201).json({message:'Add homestays Successful',result});
    });
};
const updatehomestays=(req,res)=>{
    console.log('body',req.body);
    let created_at=req.body.created_at;
    let updated_at=req.body.updated_at;
    if(updated_at && created_at)
        {
            updated_at+='T00:00:00.000Z';
            created_at+='T00:00:00.000Z';
        }
    else{
        updated_at=new Date();
        created_at=new Date();

    }
    console.log('ngay cap nhat:',created_at,updated_at);
    const update_homestay={
        title:req.body.title,
        address:req.body.address,
        description:req.body.description,
        price:parseFloat(req.body.price),
        type_bed:req.body.type_bed,
        created_at:new Date(created_at),
        updated_at:new Date(updated_at),
        room:Boolean(req.body.room)
    }
    console.log('update homestays:',update_homestay);
    homestaysmodule.updatehomestay(req.params.homestay_id,update_homestay,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'Error at controller update homestays',error:err});
        }
        if(result.affectedRows===0)
        {
            return res.status(404).json({message:'Not found'});
        }
        res.status(201).json({message:'Update Homestays Successful',result});
    });
};
const deletehomestays=(req,res)=>{
    homestaysmodule.deletehomestay(req.params.homestay_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'error at controller delete answers',error:err});
        }
        res.status(201).json({message:'Delete answers Successfull',result});
    });
}
module.exports={getallhomestays,getallhomestaysbyId,addhomestays,updatehomestays,deletehomestays};