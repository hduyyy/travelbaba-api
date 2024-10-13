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
const getalluserssbyId=(req,res)=>{
    usersmodule.getallusersbyId(req.params.user_id,(err,result)=>{
        if(err)
        {
            return res.send("error get userss by id",err);
        }
        if(!result)
        {
            res.send("users not found");
        }
        res.json(result);
    });
};
const getalluserssbyphone=(req,res)=>{
    usersmodule.getallusersbyphone(req.params.phone,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'Error at users controller',err});
        }
        if(result.length>0)
        {
            return res.status(404).json({code:404,message:'Phone number already exists',err});
        }
        res.status(201).json({code:201,message:'Find phone users succeessfull',result});
    });
};
const addusers=(req,res)=>{
    console.log('body',req.body);
    const newusers={
        user_name:req.body.user_name,
        full_name:req.body.full_name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        role:req.body.role
    }
    console.log(newusers)
    usersmodule.adduser(newusers,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'Error at controller add users',error:err});
        }
        res.status(201).json({code:201,message:'Add users Successful',data:newusers});
    });
};
const updateusers=(req,res)=>{
    console.log('body',req.body);
    const updated_user={
        full_name:req.body.full_name,
        homestay_id:req.body.homestay_id,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        updated_at:new Date(),
        role:req.body.role

    }
    console.log('update users:',updated_user);
    usersmodule.updateuser(req.params.user_id,updated_user,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'Error at controller update users',error:err});
        }
        if(result.affectedRows===0)
        {
            return res.status(404).json({message:'Not found'});
        }
        res.status(201).json({code:201,message:'Update Bookings Successful',updated_user});
    });
};


const deleteusers=(req,res)=>{
    usersmodule.deleteuser(req.params.user_id,(err,result)=>{
        if(err)
        {
            return res.status(500).json({message:'error at controller delete users',error:err});
        }
        res.status(201).json({message:'Delete users Successfull',result});
    });
};
module.exports={getallusers,getalluserssbyId,addusers,updateusers,deleteusers,getalluserssbyphone};