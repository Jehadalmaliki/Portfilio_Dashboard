const passport=require('passport')
const localStrategy=require('passport-local').Strategy
const Userlogin=require('../models/userlogin');

//saving user object in the session

passport.use('local.signup',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,username,password,done)=>{
    if(req.body.password !=req.body.confirm_password){
        return done(null,false,req.flash('error','Password is error'))
    }
}))