const { Router } = require('express');
const assert = require("assert")
const multer = require('multer');
const path = require('path');
const User = require('./../models/user');
const Skills = require('./../models/dash-skills');
// ===multer file==//

const storage = multer.diskStorage({
 
});

const upload = multer({

});

// ==routing==//
const router = Router();

/* GET index page. */
// router.get('/', (req, res) => {
//   res.render('pages/dashboard');
// });

// // dashboard page
// router.get('/dashboard', function(req, res) {
//   res.render('pages/dashboard');
// });
// social page
router.get('/dash-social', function(req, res) {
  res.render('pages/dash-social');
});
// Eduction page
router.get('/dash-Edu', function(req, res) {
  res.render('pages/dash-Eduction');
}); 
// Experince page
router.get('/dash-Experince', function(req, res) {
  res.render('pages/dash-Experince');
}); 
// Experince page
router.get('/dash-Skill', function(req, res) {
  res.render('pages/dash-skills');
}); 
// Skills page
router.get('/dash-Skill', function(req, res, next) {
  skillsModel.find().then((result)=>{
    res.render('pages/dash-skills', { skills:result});
  
  })
  });
// user operation
const userFilesHandler = upload.fields([
]);
//find
router.get('/dashboard', (req, res, next)=>{
  User.find().then((result) =>{
    res.render('pages/dashboard', { data: result})
  })
})
// add user
router.post('/user-info', userFilesHandler, async (req, res) => {
  try {
    const { username,phone,email,Address } = req.body;
    await User.insertMany({
      username,
      phone,
      Address,
      email,
     
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.log("canot derict");
    res.json(err.writeErrors[0].errmsg);
  }
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
  res.redirect('/dashboard');
});

//Delete experience item

router.get('/delete_user/:id',function(req,res,next){
  User.deleteOne({"_id":req.params.id},function(err,result){
    console.log("item deleted");
  })
  res.redirect('/dashboard');

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
module.exports = router;
