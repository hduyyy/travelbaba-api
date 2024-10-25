const express=require('express')
const app=express();
const path=require('path');
const bodyParser=require('body-parser');


require('dotenv').config({ path: './data/.env' });
const authRouter=require('./auth/auth.routes');

 const answerrouter=require('./routes/answers.routes');
 const bookingsrouter=require('../data/routes/bookings.routes');
 const cuisinesrouter=require('../data/routes/cuisines.routes');
 const eventsrouter=require('./routes/events.routes');
 const feedbackrouter=require('./routes/feedback.routes');
 const homestaysrouter=require('./routes/homestays.routes');
 const movesrouter=require('./routes/moves.routes');
 const newsrouter=require('./routes/news.routes');
 const questionsrouter=require('./routes/questions.routes');
 const reviewsrouter=require('./routes/reviews.routes');
 const shopping_centersrouter=require('./routes/shopping_centers.routes');
 const toursrouter=require('./routes/tours.routes');
 const usersrouter=require('./routes/users.routes');
app.use(express.json());
app.use(bodyParser.json());
const cors = require('cors');
 app.use(cors({
    origin: 'http://localhost:3000', // Đổi URL này thành địa chỉ của ứng dụng React của bạn
    methods: ['GET', 'POST'], // Các phương thức được phép
    credentials: true // Nếu bạn cần gửi cookie hoặc thông tin xác thực
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/upload/images',express.static(path.join(__dirname,'upload/images')));
 app.use('/api/auth',authRouter)
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
 app.listen(3001);
