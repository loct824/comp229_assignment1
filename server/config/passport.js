const passport = require('passport');
const passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
const conn = require('./db.js');
const User = conn.models.User;
const validPassword = require('../models/passwordUtils.js').validPassword;

const customFields = {
    usernameField: 'username',
    passwordField: 'password'
};

const verifyCallBack = (username, password, done) => {
    User.findOne({ username : username})
            .then((user)=>{
                if (!user){
                    return done(null,false,{type:'loginMsg', message: 'Incorrect username or password'});
                }
                const isValid = validPassword(password, user.hash, user.salt);
                if (isValid){
                    return done(null, user);
                }else{
                    return done(null, false,{type:'loginMsg', message: 'Incorrect username or password'});
                }
            }).catch(
                err=>done(err)
            );
}

const strategy = new localStrategy(customFields, verifyCallBack);

passport.use(strategy);

// Serialize and De-serialize user

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((userId,done)=>{
    User.findById(userId)
            .then((user)=>{
                done(null,user);
            }).catch(
                err=>done(err)
            );
});