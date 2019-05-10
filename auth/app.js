const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// route file path 
const authRoute = require('./api/routes/index');

//logger 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// all default routes 
app.use('/auth', authRoute);
app.get('/', (res, req, next)=>{
    req.status(200).json({
        message: 'auth server is up and running!'
    })
})

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
})

module.exports = app;