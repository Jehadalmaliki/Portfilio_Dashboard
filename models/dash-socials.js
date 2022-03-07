const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/Jehad3-Protfilio';

mongoose
  .connect(DB, {
    autoIndex: true,
  })
  .then(() => {
    console.log('DB connected :)');
  });

const socialSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Social_name: {
    type: String,
    required: true,
  },
  Link: {
    type: String,
    required: true,
    
    
  },
 
  icon: {
    type: String,
    required: true,
    
  },
  is_active: {
    type: Boolean,
     default: 1 },
 
});

const social = mongoose.model('social', socialSchema );

module.exports = social;
