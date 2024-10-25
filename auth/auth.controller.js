const bcrypt = require('bcryptjs/dist/bcrypt');
const usersmodule=require('../modules/users.module');
const jwt=require('jsonwebtoken');
const randToken=require('rand-token')
const emailservices=require('../common/email.services');
const authRegister= (req,res)=>{
    // const newuser={
    //     full_name:req.body.full_name,
    //     phone:req.body.phone,
    //     email:req.body.email,
    //     password:req.body.password
    // }
    usersmodule.getallusersbyusername(req.body.user_name,(err,resultbyUsername)=>{
        if(err)
        {
            return res.status(500).json({code:500,message:'Error while register check username'});
        }
        usersmodule.getallusersbyemail(req.body.email,(err,resultbyEmail)=>{
            if(err)
                {
                    return res.status(500).json({code:500,message:'Error while register check email'});
                }
            if(resultbyEmail||resultbyUsername)
            {
                return res.status(404).json({code:404,message:'Username or Email already exists'});
            }
            else
            {
                const hashpassword=bcrypt.hashSync(req.body.password,10);
                const refreshToken=randToken.generate(64);
                 const newUser={
                    full_name:req.body.full_name,
                     user_name:req.body.user_name,
                     email:req.body.email,
                     password:hashpassword,
                     role:req.body.role||'user',
                     refresh_token:refreshToken
                 };
                 usersmodule.adduser(newUser,(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                        return res.status(404).send({code:404,message:'Error on Register'});
                    }
                    res.status(201).json({code:201,message:'Register successfull',user:newUser}); 
                 });
            }
        });
    }); 
};
const  authLogin= (req,res)=>{
      usersmodule.getallusersbyusername(req.body.user_name.toLowerCase(),(err,username)=>{
        if (err) {
            return res.status(500).json({ code: 500, message: 'Error while logging in' });
        }
        if(!username)
            {
                return res.status(404).json({code:404,message:'Username fail'});
            }
            let password_user;
            if(req.body.password){
                 password_user= bcrypt.compareSync(req.body.password,username.password);
            }
            else
            {
                const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                password_user = hashedPassword === username.password;
            }
            
            
            if(!password_user)
            {
                return res.status(404).json({code:404,message:'Password is not correct'});
            }
            const accessTokenLife=process.env.JWT_TOKEN_LIFE;
            const accessTokenSecret=process.env.JWT_SECRET;
            console.log('accessTokenSecret:',accessTokenSecret);
            console.log('accessTokenLife:',accessTokenLife);

            const tokenData={username:username.user_name,id:username.user_id,role:username.role};
            const accessToken=jwt.sign(tokenData,accessTokenSecret,{expiresIn:accessTokenLife});
            let refreshtoken=username.refresh_token;
            if(!username.refresh_token)
            {
                refreshtoken=randToken.generate(64);
                usersmodule.updateRefreshToken(username.user_name,refreshtoken,(err)=>{
                    if(err)
                    {
                        return res.status(500).json({code:500,message:'Error Updating refresh token'});
                    }
                });
            }
            res.status(201).json({code:201,message:'Login successful!',accessToken,refreshtoken});
      });
};
const refreshAccessToken=(req,res)=>{
    const refreshToken=req.body.refresh_token;
    console.log(refreshToken);
    if(!refreshToken)
    {
        return res.status(404).json({ code: 404, message: 'Refresh token not input' });

    }
    usersmodule.getallusersbyFreshtoken(refreshToken,(err,result)=>{
        if(err|| !result)
        {
            return res.status(404).json({ code: 404, message: 'Refresh token is not valid' });
        }
        const accessTokenLife=process.env.JWT_TOKEN_LIFE;
            const accessTokenSecret=process.env.JWT_SECRET;
            const tokenData={username:result.user_name,id:result.user_id,role:result .role};
            const accessToken=jwt.sign(tokenData,accessTokenSecret,{expiresIn:accessTokenLife});
            res.status(201).json({code:201,message:'Access token refreshed',accessToken});
    });
};

//forget password
var resetCodes={};
const forgotPassword=(req,res)=>{
    const { user_name, email } = req.body;
    usersmodule.getusersbyuser_nameemail(user_name,email,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "Error while find email and user_name" ,err});
        }
        const resetCode= Math.floor(100000 + Math.random() * 900000).toString();
        resetCodes[user_name]={
            code: resetCode,
      expiry: Date.now() + 60000
        };
        emailservices.sendResetCode(email,resetCode);
        res.json({ message: "Reset code sent to email" });
    });
};
const resetPassword=(req,res)=>{
    const { user_name, reset_code, new_password } = req.body;
    if(!resetCodes[user_name]||resetCodes[user_name].code!==reset_code)
    {
        return res.status(400).json({code:400, message: "Invalid reset code" });
    }
    if (Date.now() > resetCodes[user_name].expiry) {
        delete resetCodes[user_name];
        return res.status(400).json({code:400, message: "Reset code expired" });
      }
      usersmodule.getallusersbyusername(user_name,(err,result)=>{
        if(err)
        {
            return res.status(500).json({code:500, message: "Not found user" });
        }
        usersmodule.updatePassword(user_name,new_password,(err)=>{
            if (err) {
                return res.status(500).json({ message: "Failed to update password" });
              }
              delete resetCodes[user_name];
              res.status(201).json({code:201, message: "Password updated successfully" });
        });
      });
};
const ChangePassword=(req,res)=>{
    const{oldPassword,newPassword}=req.body;
    const username=req.user.username;
    console.log(req.user);
    usersmodule.getallusersbyusername(username,(err,user)=>{
        if(err||!user)
        {
            return res.status(404).json({code:404, message: 'User not found!' });
        }
        const passwordvalid=bcrypt.compareSync(oldPassword,user.password);
        if(!passwordvalid)
        {
            return res.status(404).json({code:404, message: ' Old password is not correct' });
        }
        const hashedPassword=bcrypt.hashSync(newPassword,10);
        user.password=hashedPassword;
        usersmodule.updatePassword(username,hashedPassword,(err)=>{
            if(err)
            {
                return res.status(500).json({code:500, message: ' Error while change password' });
            }
             res.status(200).json({code:200, message: ' Change password successfull!' });

        })

    });
};
const UpdateRole=(req,res)=>{
    const {newRole}=req.body;
    // if(req.user.role!=="admin")
    // {
    //     return res.status(404).json({ code: 404, message: 'You not admin' });
    // }
    if(!["admin","user"].includes(newRole))
    {
        return res.status(400).json({ code: 400, message: 'Just admin or user' });
    }
    usersmodule.updateRoleUser(req.params.user_id,newRole,(err,result)=>{
        if (err) {
            return res.status(500).json({ code: 500, message: 'Error updating role', error: err });
        }
        res.status(201).json({ code: 201, message: 'Role updated successfully' });

    })
}
module.exports={authRegister,authLogin,refreshAccessToken,forgotPassword,resetPassword,ChangePassword,UpdateRole};