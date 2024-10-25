var mysql=require('mysql2');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'data_webdulich',
    port:3306
});
connection.connect((err,result)=>{
    if(err)
    {
        console.log("ket noi csdl khong thanh cong");
    }
    else {console.log("Access Mysql Successfull");}
});
module.exports=connection;