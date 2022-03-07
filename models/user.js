const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/Jehad3-Protfilio';

mongoose
  .connect(DB, {
    autoIndex: true,
  })
  .then(() => {
    console.log('DB connected :)');
  });

const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  icon: {
    type: String,
    required: true,

    
  },
  phone: {
    type: Number,
   
    unique: true,
    
  },
  Address: {
    type: String,
    
 
   
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  is_active: {
     type: Boolean,
      default: 1 },

});

const User = mongoose.model('User', fileSchema);

module.exports = User;
