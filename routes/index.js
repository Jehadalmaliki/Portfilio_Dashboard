const { Router } = require('express');
const assert = require("assert")
const multer = require('multer');

const path = require('path');

var fs = require('fs');
const User = require('../models/user');
const Skills = require('./../models/dash-skills');
var experienceModel = require('../models/Experince');
var qualificationsModel=require('../models/eduction');
var social=require('../models/dash-socials');
var Works=require('../models/Works');
var Service=require('../models/dash-service');

require('dotenv/config');
const router = Router();
// ===multer file==//
// ==routing==//

// protifilio images





// social image
const storage = multer.diskStorage({
 
  filename: (req, file, cb) => {
    const randomNumber = Math.round(Math.random() * 1e9);
    const uniqueSuffix = `${Date.now()}-${randomNumber}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
  
  destination: (req, file, cb) => {
    cb(null, './public/upload');
  },
});

const upload = multer({
  fileFilter: (req, { fieldname, mimetype, originalname }, cb) => {
    const isicon =
      fieldname == 'icon' ;
   
  

    if (isicon) cb(null, true);
 
    else cb(new Error(`Sorry  The type of ${originalname} not support.`), false);
  },
  storage,
});
const userFilesHandler = upload.fields([
  {
    name: 'icon',
    maxCount: 1,
  },
  
]);




// Social page
router.get('/dash-social', function(req, res) {
  social.find().then((result)=>{
  
    res.render('pages/dash-social', { social:result });
  })
 
});
// Works page
router.get('/dash-Works', function(req, res) {
  Works.find().then((result)=>{
  
    res.render('pages/dash-Works', { Works:result });
  })
 
});
// Eduction page
 
router.get('/dash-Edu', function(req, res, next) {
  qualificationsModel.find().then((result)=>{
  
    res.render('pages/dash-Eduction', { qualifications:result });
  })
  });
// GET Expirence 
router.get('/dash-Experince', (req, res, next)=>{
  experienceModel.find().then((result) =>{
    res.render('pages/dash-Experince', { data: result})
  })
})
// 
// Skills page
router.get('/dash-Skill', function(req, res, next) {
  Skills.find().then((result)=>{
    res.render('pages/dash-skills', { skills:result});
  console.log(result);
  })
  });
 
//  Service page
router.get('/dash-Service', function(req, res, next) {
  Service.find().then((result)=>{
    res.render('pages/dash-Service', { Service:result});
  console.log(result);
  })
  });
 // Index page
router.get('/index', async(req, res)=> {
  var qualifications = await qualificationsModel.find();;
  var skill= await Skills.find();
  var experience= await experienceModel.find();
  var social1= await social.find();
  var Worksp= await Works.find();
  var Servicea= await Service.find();
  res.render('pages/index', { qualification:qualifications ,skills:skill ,data:experience,social:social1 ,Works:Worksp,Service:Servicea})
 
});
// user operation

//find
// middleware to check if user is logged in 


router.get('/home', (req, res, next)=>{
  User.find().then((result) =>{
    res.render('pages/home', { data: result})
  })
})
// add user


    router.post('/user-info', userFilesHandler, async (req, res) => {
      try {
        const {  phone,  Address, email } = req.body;
        const { icon } = req.files;
    
        await  User.insertMany({
          phone,
      Address,
      email,
          icon: icon[0].filename
         
        });
    
        res.redirect('/home');
      } catch (err) {
        console.log(err.writeErrors);
        res.json(err.writeErrors[0].errmsg);
      }
    });
//Edit  user on the view in the data tables section

router.post('/edit_User', userFilesHandler,function(req, res, next){
  
  var item = {
  
    phone: req.body.phone,
    Address:req.body.Address,
    email:req.body.email,
    icon:req.files.icon[0].filename,
  };
  var id = req.body.id;
  User.updateMany({"_id": id}, {$set: item}, item, function(err, result){
   
    console.log("item updated");
    console.log(item);
  })
  res.redirect('/home');
});

//Delete user item

router.get('/delete_user/:id',function(req,res,next){
  User.updateOne({"_id":req.params.id},function(err,result){
    console.log("item deleted");
  })
  res.redirect('/home');

});

//Add new skill to the view in the data tables section
router.post('/addskills', function(req, res, next) {
     
  var skillDetails = new Skills({
    title: req.body.title,
    progress_percent: req.body.progress_percent,
   
  });
   
  skillDetails.save();
        
console.log("skill was add")
res.redirect('/dash-Skill');

});
// Edit Skills
router.post('/Edit_skills', function(req, res, next){
  
  var item = {
    title: req.body.title,
    progress_percent: req.body.progress_percent,
   
  };
  var id = req.body.id;
  Skills.updateMany({"_id": id}, {$set: item}, item, function(err, result){
   
    console.log("item updated");
    console.log(item);
  })
  res.redirect('/dash-Skill');
});
//Delete skill item

router.get('/delete_skill/:id',function(req,res,next){
  Skills.updateOne({"_id":req.params.id},{"is_active":false},function(err,result){
    console.log("item deleted");
  })
  res.redirect('/dash-Skill');

});

//Add new expirince to the view in the data tables section

router.post('/add_experience', function(req, res, next) {
     
  var experienceDetails = new experienceModel({
    experience: req.body.experience,
    year: req.body.year,
    company_name: req.body.company_name,
    Description: req.body.Description,
        Start_Date: req.body.Start_Date,
        End_Date: req.body.End_Date,
  });
   
  experienceDetails .save();
        

    res.redirect('/dash-Experince');

});
// Edit expirince
//Edit  experience on the view in the data tables section

router.post('/edit_experience', function(req, res, next){
  var item = {
    experience: req.body.experience,
    year: req.body.year,
    company_name:req.body.company_name,
    Description: req.body.Description,
    Start_Date: req.body.Start_Date,
    End_Date: req.body.End_Date
  };
  var id = req.body.id;
  experienceModel.updateMany({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log("item updated");
  })
  res.redirect('/dash-Experince');
});

//Delete experience item

router.get('/delete_experience/:id',function(req,res,next){
  experienceModel.updateOne({"_id":req.params.id},{"is_active":false},function(err,result){
    console.log("item deleted");
  })
res.redirect('/dash-Experince');

});

//Add new Eduction to the view in the data tables section
router.post('/add_qualification', function(req, res, next) {
     
  var qualificationDetails = new qualificationsModel({
    qualification: req.body.qualification,
    date: req.body.date,
    university: req.body.university,
  });
   
  qualificationDetails.save();
        

    res.redirect('/dash-Edu');

});

// Edit  Eduction on the view in the data tables section

router.post('/edit_qualification', function(req, res, next){
  var item = {
    qualification: req.body.qualification,
    date: req.body.date,
    university:req.body.university
  };
  var id = req.body.id;
  qualificationsModel.updateMany({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log("item updated");
  })
  res.redirect('/dash-Edu');
});

//Delete Eduction item

router.get('/delete_qualification/:id',function(req,res,next){
  qualificationsModel.updateOne({"_id":req.params.id},{"is_active":false},function(err,result){
    console.log("item deleted");
  })
res.redirect('/dash-Edu');

});
 
//Add social item


router.post('/add_social', userFilesHandler, async (req, res) => {
  try {
    const { Social_name, Link } = req.body;
    const { icon } = req.body;

    await social.insertMany({
      Social_name,
      Link,
      icon,
     
    });

    res.redirect('/dash-social');
  } catch (err) {
    console.log(err.writeErrors);
    res.json(err.writeErrors[0].errmsg);
  }
});
// Edit  Social on the view in the data tables section

router.post('/edit_social', function(req, res, next){
  var item = {
    Social_name: req.body.Social_name,
    Link: req.body.Link,
    icon:req.body.icon,
  };
  var id = req.body.id;
  social.updateMany({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log(item );
  })
  res.redirect('/dash-social');
});

//Delete Social item

router.get('/delete_social/:id',function(req,res,next){
  social.updateOne({"_id":req.params.id},{"is_active":false},function(err,result){
    console.log("item deleted");
  })
res.redirect('/dash-social');

});

//AddWorks item


router.post('/add_Works', userFilesHandler, async (req, res) => {
  try {
    const {Works_name, Link } = req.body;
    const { icon } = req.files;

    await Works.insertMany({
     Works_name,
      Link,
      icon: icon[0].filename
     
    });

    res.redirect('/dash-Works');
  } catch (err) {
    console.log(err.writeErrors);
    
  }
});
// Edit Works on the view in the data tables section

router.post('/edit_Works',userFilesHandler, function(req, res, next){
  var item = {
   Works_name: req.body.Works_name,
    Link: req.body.Link,
    icon:req.files.icon[0].filename,
  };
  var id = req.body.id;
 Works.updateMany({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log(item );
  })
  res.redirect('/dash-Works');
});

//Delete Works item

router.get('/delete_Works/:id',function(req,res,next){
 Works.updateOne({"_id":req.params.id},{"is_active":false},function(err,result){
    console.log("item deleted");
  })
res.redirect('/dash-Works');

});
// Add Service
router.post('/add_Service',  userFilesHandler,async (req, res) => {
  try {
    const { Service_name, Link } = req.body;
    const { icon } = req.body;

    await Service.insertMany({
      Service_name,
      Link,
      icon,
     
    });

    res.redirect('/dash-Service');
  } catch (err) {
    console.log(err.writeErrors);
   
  }
});
// Edit  Service on the view in the data tables section

router.post('/edit_Service', function(req, res, next){
  var item = {
    Service_name: req.body.Service_name,
    Link: req.body.Link,
    icon:req.body.icon,
  };
  var id = req.body.id;
  Service.updateMany({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log(item );
  })
  res.redirect('/dash-Service');
});

//Delete Service item

router.get('/delete_Service/:id',function(req,res,next){
  Service.updateOne({"_id":req.params.id},{"is_active":false},function(err,result){
    console.log("item deleted");
  })
res.redirect('/dash-Service');

});
module.exports = router;
