const mongoose = require("mongoose");

const Sechema =mongoose.Schema; 
// create an schema
var qualificationsSchema = new Sechema({
    qualification: {
                type:String,
                required:true
            },
            date:{
                type:String,
                required:true,
            },
            university:{
                type:String,
                required:true,
            },

            is_active: {
                type: Boolean,
                 default: 1 },  
        },
        
        {
            timestamps:true
        }
        
        );
 
var qualificationsModel=mongoose.model('qualifications',qualificationsSchema);
 
module.exports = qualificationsModel;