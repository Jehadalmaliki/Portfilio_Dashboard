const passport=require('passport')
const localStrategy=require('passport-local').Strategy
const Userlogin=require('../models/userlogin');

//saving user object in the session
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//when you make requst
passport.deserializeUser(function(id,done){
    Userlogin.findById(id,function (err,user) {
        done(err,user);
        
    })
})
// signup stratege
passport.use('local.signup',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,username,password,done)=>{
    if(req.body.password !=req.body.confirm_password){
        return done(null,false,req.flash('error','Password do not match'))
    }else {
        Userlogin.findOne({email:username},(err,user)=>{
            if(err){
                return done(err)
            }
            if(user){
                return done(null,false,req.flash('error','Email already used')) 
            }
            if (!user){
                let newUser=new  Userlogin()
                newUser.email=req.body.email
                newUser.password=newUser.hashPassword(req.body.password)
                newUser.save((err,user)=>{
                    if(!err){
                        return done(null,user,req.flash('success','User Added'))  
                    }else{
                        console.log(err)
                    }
                })
            }
        })
    }
}))
// login strategy
passport.use('local.login',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,username,password,done)=>{

    //find user
    Userlogin.findOne({email:username},(err,user)=>{
        if(err){
            return done(null,false,req.flash('error','something wrong happened'))  
        }
        if(!user){
            return done(null,false,req.flash('error','user was not found')) 
        }
        if (user){
            if(user.comparePasswords(password,user.password)){
                return done(null,user,req.flash('success','welcome back'))
            }else{
                return done(null,false,req.flash('error','password is wrong'))  
            }
        }
    })
}))