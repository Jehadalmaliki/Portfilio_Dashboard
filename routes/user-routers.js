const express=require('express');
const req = require('express/lib/request');
const passport = require('passport');
const router=express.Router();
const Userlogin=require('../models/userlogin');

// middleware to check if user is logged in 
// isAuthenticated=(req,res,next)=>{
//     if(req.isAuthenticated()) return next()
//     res.redirect('/user/login')
// }
function check(req,res,next){
    console.log(req)
if(req.isAuthenticated()){
    next();
}
else{
    res.redirect('/user/login')
}
}


//login user view
router.get('/login',(req,res)=>{
    console.log(req.body)
    res.render('user/login',{error:req.flash('error')})
})
//login post request
router.post('/login',passport.authenticate('local.login',{
    successRedirect:'/home',
    failureRedirect:'/user/login',
    failureFlash:true
   
}));

//sign up form
router.get('/signup',(req,res)=>{
    console.log(req.body)
    res.render('user/singup',{error:req.flash('error')})
})
//sing up post
router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/home',
    failureRedirect:'/user/signup',
    failureFlash:true
   
}));
//dashboard, profilie
// router.get('/pro',check,(req,res)=>{
  
//     res.render('user/profile',{success:req.flash('success')})
   
// });
router.get('/home',check,(req,res)=>{
    res.render('pages/home',{success:req.flash('success')})
});
// logout user
router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/user/login')
   
});
// router.get('/logout', function (req, res) { 
//     req.logOut(); // remove all session data 
//     req.session = null; 
//     res.redirect('/user/login'); });
// router.get('/logout', function(req, res) {
//     console.log("I am Logout")
//     req.logout(); 
//     res.json({ 
//             status: "logout",
//             msg:"Please Log In again"
//          });
// });
module.exports=router