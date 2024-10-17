const  jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ code: 401, message: 'Authorization header not found' });
    }
    console.log(token);
    
    jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
        if(!token)
            {
                return res.status(404).json({code:404,message:'Token not exists '});
        
            }
        if(err)
        {
            return res.status(404).json({code:404,message:'Token not valid '});
        }
        req.user=result;
        next();
    });
};
const AuthAdmin=(req,res,next)=>{
    if(req.user.role!=='admin'){
        return res.status(404).json({ code: 404, message: 'You are not authorized to access this resource' });
    }
    next();
};
const AuthUser=(req,res,next)=>{
    if(req.user.role!=='user'){
        return res.status(404).json({ code: 404, message: 'You are not authorized to access this resource' });
    }
    next();
};

module.exports={verifyToken,AuthAdmin,AuthUser}