const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/Jehad3-Protfilio';

mongoose
  .connect(DB, {
    autoIndex: true,
  })
  .then(() => {
    console.log('DB connected :)');
  });

const ServiceSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Service_name: {
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

const Service = mongoose.model('Service', ServiceSchema );

module.exports = Service;
