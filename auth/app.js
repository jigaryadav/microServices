const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb+srv://admin:admin@cluster0-9h6sm.gcp.mongodb.net/test',{ 
    useNewUrlParser: true,
    useCreateIndex: true
}).then((res, error)=>{
    if(res) console.log('database connected !! ');
    if(error) console.log('database connection failed!', error);
}).catch((err)=>{
    console.log('database connection failed!', err);
})

// route file path 
const authRoute = require('./api/routes/index');

// logger and middlleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// v1 all default routes 
app.use('/v1', authRoute);

//error handling for auth 
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    const status = error.status || 500;
    res.status(status);
    res.json({
        status : status,
        error:{
            message: error.message
        }
    })
    next();
})

module.exports = app;