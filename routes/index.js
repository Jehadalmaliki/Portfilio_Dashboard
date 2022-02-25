const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const User = require('./../models/user');
// ===multer file==//

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
    const isProfile =
      fieldname == 'profile_picture' && mimetype == 'image/jpeg';
    // const isCV = fieldname == 'cv_file' && mimetype == 'application/pdf';
  

    if (isProfile) cb(null, true);
    // else if (isCV) cb(null, true);
    else cb(new Error(`Sorry  The type of ${originalname} not support.`), false);
  },
  storage,
});

// ==routing==//
const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('pages/dashboard');
});

// dashboard page
router.get('/dashboard', function(req, res) {
  res.render('pages/dashboard');
});
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
// user operation
const userFilesHandler = upload.fields([
  {
    name: 'profile_picture',
    maxCount: 1,
  },
  // {
  //   name: 'cv_file',
  //   maxCount: 1,
  // },
]);

router.post('/index', userFilesHandler, async (req, res) => {
  try {
    const { username,phone,email,Address } = req.body;
    const { profile_picture} = req.files;

    await User.insertMany({
      username,
      phone,
      Address,
      email,
      profile_picture: profile_picture[0].path,
      // cv_file: cv_file[0].path,
    });

    res.render('pages/index');
  } catch (err) {
    console.log(err.writeErrors);
    res.json(err.writeErrors[0].errmsg);
  }
});

module.exports = router;
