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
var Protfilio_Img=require('../models/image_protifilio');
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
      fieldname == 'icon' && mimetype == 'image/jpeg';
   
  

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

// Index page
router.get('/index', async(req, res)=> {
  var qualifications = await qualificationsModel.find();
  var skill= await Skills.find();
  var experience= await experienceModel.find();
  var social1= await social.find();

  res.render('pages/index', { qualification:qualifications ,skills:skill ,data:experience,social:social1})
 
});


// Social page
router.get('/dash-social', function(req, res) {
  social.find().then((result)=>{
  
    res.render('pages/dash-social', { social:result });
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
//   // image protfilio

// var storage1 = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, './public/upload')
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, file.fieldname + '-' + Date.now())
// 	}
// });

// var upload1 = multer({ storage: storage1 });
// // Step 6 - load the mongoose model for Image



// // router.get('/', (req, res) => {
// //   Protfilio_Img.find({}, (err, items) => {
// // 		if (err) {
// // 			console.log(err);
// // 			res.status(500).send('An error occurred', err);
// // 		}
// // 		else {
// // 			res.render('partials/dash-sliderbar', { items: items });
// // 		}
// // 	});
// // });
// // Step 8 - the POST handler for processing the uploaded file

// router.post('/img', upload1.single('image'), (req, res, next) => {

// 	var obj = {
// 		name: req.body.name,
// 		desc: req.body.desc,
// 		img: {
// 			data: fs.readFileSync(path.join(__dirname + './public/upload' + req.file.filename)),
// 			contentType: 'image/png'
// 		}
   
// 	}
//   console.log(obj);
//   Protfilio_Img.create(obj, (err, item) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
		
// 			// res.redirect('/');
//       res.redirect('/dash-social');
// 		}
// 	});
// });


// user operation

//find
router.get('/home', (req, res, next)=>{
  User.find().then((result) =>{
    res.render('pages/home', { data: result})
  })
})
// add user
router.post('/user-info', function(req, res, next) {
    var userDetails = new  User({
      username: req.body.username,
      phone: req.body. phone,
      Address: req.body. Address,
      email: req.body. email,
    })
     
    userDetails.save();
    res.redirect('/home');

});
//Edit  user on the view in the data tables section

router.post('/edit_User', function(req, res, next){
  console.log(req.body.username);
  var item = {
    username: req.body.username,
    phone: req.body.phone,
    Address:req.body.Address,
    email:req.body.email,
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
  User.deleteOne({"_id":req.params.id},function(err,result){
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
  Skills.deleteOne({"_id":req.params.id},function(err,result){
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
  experienceModel.updateOne({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log("item updated");
  })
  res.redirect('/dash-Experince');
});

//Delete experience item

router.get('/delete_experience/:id',function(req,res,next){
  experienceModel.deleteOne({"_id":req.params.id},function(err,result){
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
  qualificationsModel.updateOne({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log("item updated");
  })
  res.redirect('/dash-Edu');
});

//Delete Eduction item

router.get('/delete_qualification/:id',function(req,res,next){
  qualificationsModel.deleteOne({"_id":req.params.id},function(err,result){
    console.log("item deleted");
  })
res.redirect('/dash-Edu');

});
 
//Add social item


router.post('/add_social', userFilesHandler, async (req, res) => {
  try {
    const { Social_name, Link } = req.body;
    const { icon } = req.files;

    await social.insertMany({
      Social_name,
      Link,
      icon: icon[0].filename
     
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
  social.updateOne({"_id": id}, {$set: item}, item, function(err, result){
    assert.equal(null, err);
    console.log(item );
  })
  res.redirect('/dash-social');
});

//Delete Social item

router.get('/delete_social/:id',function(req,res,next){
  social.deleteOne({"_id":req.params.id},function(err,result){
    console.log("item deleted");
  })
res.redirect('/dash-social');

});
 

module.exports = router;
