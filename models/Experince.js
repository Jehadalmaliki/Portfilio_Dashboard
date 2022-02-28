const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/Jehad3-Protfilio';

mongoose
  .connect(DB, {
    autoIndex: true,
  })
  .then(() => {
    console.log('DB connected :)');
  });


const Sechema =mongoose.Schema; 
// create an schema
var experienceSchema = new Sechema({
    experience: {
                type:String,
                required:true
            },
            year:{
                type:Number,
                required:true,
            },
            company_name:{
                type:String,
                required:true,
            },
            Description: {
                  type: String,
                  required: true,
                  
                },
                Start_Date: {
                  type: Date,
                  required: true,
                 
                  
                },
                End_Date: {
                  type: Date,
                  required: true,
                 
                  
                },
              
            createdAt: {
                  type: Date,
                  default: Date.now,
                },
                is_active: {
                       type: Boolean,
                        default: 1 }
            
        });
 
var experienceModel=mongoose.model('experience',experienceSchema);
 
module.exports = experienceModel;

