

var mongoose = require('mongoose');
const DB = 'mongodb://127.0.0.1:27017/Jehad3-Protfilio';

mongoose
  .connect(DB, {
    autoIndex: true,
  })
  .then(() => {
    console.log('DB connected :)');
  });
var imageSchema = new mongoose.Schema({
	name: String,
	desc: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
});



const Protfilio_Img =mongoose.model('Image', imageSchema);

module.exports = Protfilio_Img ;