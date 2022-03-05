const express=require('express');
const req = require('express/lib/request');
const passport = require('passport');
const router=express.Router();
const Userlogin=require('../models/userlogin');
//login user view
router.get('/login',(req,res)=>{
 res.render('user/login')
})
//login post request
router.post('/login',(req,res)=>{
    console.log(req.body)
    res.render('user/singup')
})

//sign up form
router.get('/signup',(req,res)=>{
    console.log(req.body)
    res.render('user/singup',{error:req.flash('error')})
})
//sing up post
router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/user/profilie"',
    failureRedirect:'/user/signup',
    failureFlash:true
   
}));
//dashboard, profilie
router.get('/profilie',(req,res)=>{
    res.render('user/profile',{success:req.flash('success')})
})
// logout user
router.get('/logout',(req,res)=>{
    res.json('logout user...')
})
module.exports=router