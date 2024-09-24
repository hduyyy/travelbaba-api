var mysql=require('mysql2');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'du_an_web_dulich',
    port:3306
});
connection.connect((err)=>{
    if(err)
    {
        console.log("ket noi csdl khong thanh cong");
    }
});
module.exports=connection;