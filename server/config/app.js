let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Authentication dependencies
let session = require('express-session');
const passport = require('passport');

// database setup
let mongoose = require('mongoose');

// gives access to variables set in the .env file via `process.env.VARIABLE_NAME`
require('dotenv').config();


// express app
let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// express session set-up
app.use(session(
    {
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1000 milliseconds per second, 60 seconds per minute, 60 minutes per hour, 24 hours per day
        }
    }));

// Flash messages
const flash = require('connect-flash');
app.use(flash());


// Passport authentication
require('./passport.js');
app.use(passport.initialize());
app.use(passport.session());

// for checking if the user is authenticated in ejs view templates

isAuthenticated = (req,res,next)=>{
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.username = req.user ? req.user.username : null;
    next();
}

app.use(isAuthenticated);


// Routes
let indexRouter = require('../routes/index');
app.use('/', indexRouter);

let authRouter = require('../routes/auth.js');
app.use('/auth',authRouter);

let businessRouter = require('../routes/business.js');
app.use('/business',businessRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
