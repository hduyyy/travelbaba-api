var express=require('express')
var app=express();
 var answerrouter=require('./routes/answers.routes');
 var bookingsrouter=require('../data/routes/bookings.routes');
 var cuisinesrouter=require('../data/routes/cuisines.routes');
 var eventsrouter=require('./routes/events.routes');
 var feedbackrouter=require('./routes/feedback.routes');
 var homestaysrouter=require('./routes/homestays.routes');
 var movesrouter=require('./routes/moves.routes');
 var newsrouter=require('./routes/news.routes');
 var questionsrouter=require('./routes/questions.routes');
 var reviewsrouter=require('./routes/reviews.routes');
 var shopping_centersrouter=require('./routes/shopping_centers.routes');
 var toursrouter=require('./routes/tours.routes');
 var usersrouter=require('./routes/users.routes');

 app.use('/',bookingsrouter);
 app.use('/',answerrouter);
 app.use('/',cuisinesrouter);
 app.use('/',eventsrouter);
 app.use('/',feedbackrouter);
 app.use('/',homestaysrouter);
 app.use('/',movesrouter);
 app.use('/',newsrouter);
 app.use('/',questionsrouter);
 app.use('/',reviewsrouter);
 app.use('/',shopping_centersrouter);
 app.use('/',toursrouter);
 app.use('/',usersrouter);



// var mysql=require('mysql2');
// const db=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'123456',
//     database:'du_an_web_dulich'
// });
// db.connect((err)=>{
//     if(err)
//     {
//         console.log("error mysql",err);
//         return;
//     }
//     console.log("data thanh cong"); 
// })
// app.get('/api/answers',(req,res)=>{
//     const query='SELECT * from answers';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("loi",err);
//         }
//         res.json(result);
//     });

// });
// app.get('/api/answers/:id',(req,res)=>{
//     const answerId=req.params.id;
//     const query='select * from answers where id=?';
//     db.query(query,[answerId],(err,result)=>{
//         if(err)
//         {
//             console.log("loi answerid",err);
//         }
//         if(result.length===0)
//         {
//             console.log("không tồn tại");
//         }
//         res.json(result[0]);
//     });
// });
// app.get('/api/bookings',(req,res)=>{
//     const query='Select * from bookings';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error bookings",err);
//         }
//         res.json(result);
//     });
// });
// app.get('/api/cuisines',(req,res)=>{
//     const query='Select * from cuisines';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error cuisines",err);
//         }
//         res.json(result);
//     });
// });
// app.get('/api/events',(req,res)=>{
//     const query='Select * from events';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error events",err);
//         }
//         res.json(result);
//     });
// });
// app.get('/api/feedback',(req,res)=>{
//     const query='Select * from feedback';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error feedback",err);
//         }
//         res.json(result);
//     });
// });
// app.get('/api/moves',(req,res)=>{
//     const query='Select * from moves';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error movies",err);
//         }
//         res.json(result);
//     });
// });
// app.get('/api/news',(req,res)=>{
//     const query='Select * from news';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error news",err);
//         }
//         res.json(result);
//     });
// });
// app.get('/api/questions',(req,res)=>{
//     const query='Select * from questions';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error question",err);
//         }
//         res.json(result);
//     });
// });
// app.get('/api/reviews',(req,res)=>{
//     const query='Select * from reviews';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error reviews",err);
//         }
//         res.json(result);
//     });
// });
// app.get('/api/shopping_centers',(req,res)=>{
//     const query='Select * from shopping_centers';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error shopping_centers",err);
//         }
//         res.json(result);
//     });
// });
// app.get('/api/tours',(req,res)=>{
//     const query='Select * from tours';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error tours",err);
//         }
//         res.json(result);
//     });
// });
// app.get('/api/users',(req,res)=>{
//     const query='Select * from users';
//     db.query(query,(err,result)=>{
//         if(err)
//         {
//             console.log("error users",err);
//         }
//         res.json(result);
//     });
// });

app.listen(3000);