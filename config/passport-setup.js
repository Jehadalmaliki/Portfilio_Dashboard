const passport=require('passport')
const localStrategy=require('passport-local').Strategy
const Userlogin=require('../models/userlogin');

//saving user object in the session
passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    Userlogin.findById(id,function (err,user) {
        done(err,user);
        
    })
})
passport.use('local.signup',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,username,password,done)=>{
    if(req.body.password !=req.body.confirm_password){
        return done(null,false,req.flash('error','Password is error'))
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
                        return done(null,false,req.flash('success','User Added'))  
                    }else{
                        console.log(err)
                    }
                })
            }
        })
    }
}))