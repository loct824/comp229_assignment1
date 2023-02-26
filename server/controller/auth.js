const passport = require('passport');
const genPasswordHash = require('../models/passwordUtils.js').genPasswordHash;
const conn = require('../config/db.js');
const User = conn.models.User;


module.exports.displayLoginPage = (req,res,next)=>{
    if (!req.user){
        let message = req.flash('loginMsg');
        if (message.length === 0 ){
            message = 'Please log in to proceed. Click "Register Here" for first-time visit.'; 
        }
        res.render('auth/login',
        {
            title: 'Login',
            message: message
            // message: req.flash('error')
            // message: 'TTTT'
        });
    }
    else{
        res.redirect('/');
    }
};

module.exports.displayRegisterPage = (req,res,next)=>{
    if (!req.user){
        res.render('auth/register',
        {
            title: 'Register',
            message: req.flash('registerMsg')
        });
    }
    else{
        res.redirect('/');
    }
};

module.exports.passportAuth = passport.authenticate('local',{
    // failureFlash: 'Incorrect username or password.',
    failureFlash: true,
    failureRedirect: '/auth/login'
});

module.exports.postLogin = (req,res,next)=>{
    res.redirect('/business');
};

module.exports.checkUserExists = (req,res,next)=>{
    User.findOne({username:req.body.username},(err,user)=>{
        if(err){
            console.log(err);
            return;
        }
        if(user){
            console.log(req.body.username);
            console.log(user);
            req.flash('registerMsg',"Username \""+req.body.username+"\" already exists.");
            res.redirect('/auth/register');
        }
        else{
            req.flash('loginMsg',"Successfully registered. Please log in to proceed.")
            next();
        }
    });
}

module.exports.postRegister = (req,res,next)=>{
    const saltHash = genPasswordHash(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    newUser.save().then(user=>{console.log(user);});

    res.redirect('/auth/login');
};

module.exports.getLogout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect('/');
    })
};

module.exports.requestLogin = (req,res,next)=>{
    if (res.locals.isAuthenticated){
        next();
    }
    else{
        res.redirect('/auth/login');
    }
};
