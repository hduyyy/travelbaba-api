const express=require('express');
const app=express();
const port=3500;
const path=require('path')
const { create}=require('express-handlebars');
const morgan=require('morgan');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,'css')))
app.set('views',path.join(__dirname,'resource/views'));
const hbs=create({
    defaultLayout:'main',
    extname:'hbs'
});
app.use(express.static(__dirname));
app.engine('hbs',hbs.engine);
app.set('view engine','hbs');
var homroutes=require('')
app.listen(port);