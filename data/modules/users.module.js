const db=require('../common/connect');
const getallusers = (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
const getallusersbyId=(user_id,callback)=>{
    const query='select * from users where user_id=?';
    db.query(query,[user_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const getallusersbyphone=(phone,callback)=>{
    const query='select * from users where phone=?';
    db.query(query,[phone],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const getallusersbyusername=(user_name,callback)=>{
    const query='select * from users where user_name=?';
    db.query(query,[user_name],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const getallusersbyFreshtoken=(refresh_token,callback)=>{
    const query='select * from users where refresh_token=?';
    db.query(query,[refresh_token],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const getallusersbyemail=(email,callback)=>{
    const query='select * from users where email=?';
    db.query(query,[email],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};
const getusersbyuser_nameemail=(email,user_name,callback)=>{
    const query='select * from users where user_name=? AND email=?';
    db.query(query,[email,user_name],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        callback(null,result[0]);
    });
};


const adduser=(users,callback)=>{
    const query='insert into users (user_name,full_name,email,password,phone,role,refresh_token) values (?,?,?,?,?,?,?)';
    db.query(query,[users.user_name,users.full_name,users.email,users.password,users.phone,users.role,users.refresh_token],(err,result)=>{
        if(err)
        {         
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const updateRefreshToken=(user_name, refreshToken, callback)=>{
    const query='UPDATE users SET refresh_token = ? WHERE user_name = ?';
    db.query(query, [refreshToken, user_name], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      });
    };
    const updatePassword = (user_name, password, callback) => {
        const query = 'UPDATE users SET password = ? WHERE user_name = ?';
        db.query(query, [password, user_name], (err,result)=>{
            if(err)
                {
                    return callback(err,null);
                }
                 callback(null,result);
        });
    };
const updateuser=(user_id,users,callback)=>{
    const query='update users set user_name=?, full_name=?,email=?,password=?,phone=?,updated_at=?,role=? where user_id=?';
    db.query(query,[users.user_name,users.full_name,users.email,users.password,users.phone,users.updated_at,users.role,user_id],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);
    });
};
const deleteuser=(user_id,callback)=>{
    const query='delete from users where  user_id=?';
    db.query(query,[user_id],(err,result)=>{
        if(err)
        {
            console.log("error at module delete users");
        return callback(err,null);
        }
        callback(null,result);
        
    });
};
const findfullname=(full_name,callback)=>{
    const query='select * from users where full_name like ?';
    db.query(query,[`%${full_name}%`],(err,result)=>{
        if(err)
        {
            return callback(err,null);
        }
        return callback(null,result);

    });
};
module.exports={getallusers,getallusersbyId,adduser,updateuser,deleteuser,getallusersbyphone,getallusersbyusername,getallusersbyFreshtoken,getallusersbyemail,updateRefreshToken,getusersbyuser_nameemail,updatePassword,findfullname};