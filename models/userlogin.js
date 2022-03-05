const mongoose = require('mongoose');
const becrypt=require('bcrypt-nodejs')

const DB = 'mongodb://127.0.0.1:27017/Jehad3-Protfilio';

mongoose
  .connect(DB, {
    autoIndex: true,
  })
  .then(() => {
    console.log('DB connected :)');
  });

const userlogin = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password :{
    type  : String,
    required : true
} ,
  is_active: {
     type: Boolean,
      default: 1 }
 
});
userlogin.methods.hashPassword=(password)=>{
  return becrypt.hashSync(password,becrypt.genSaltSync(10))
}
userlogin.methods.comparePasswords=(password,hash)=>{
  return becrypt.compareSync(password,hash)
}
const Userlogin = mongoose.model('Userlogin', userlogin);

module.exports = Userlogin ;
