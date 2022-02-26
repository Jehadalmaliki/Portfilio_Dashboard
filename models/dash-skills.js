// const mongoose = require('mongoose');

// const DB = 'mongodb://127.0.0.1:27017/Jehad3-Protfilio';

// mongoose
//   .connect(DB, {
//     autoIndex: true,
//   })
//   .then(() => {
//     console.log('DB connected :)');
//   });
//   const skillsSchema = new mongoose.Schema({
      
//     title: { 
//         type: String,
//          required: true 
//         },
//     progress_percent: { 
//         type: Number,
//          required: true },
//     is_active: {
//          type: Number,
//           default: 1 },
//     createdAt: {
//          type: Date,
//           default: Date.now },
//   });
  
//   const Skills = mongoose.model('Skills', skillsSchema);
//   module.exports = Skills;