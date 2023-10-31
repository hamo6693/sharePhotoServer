
const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema({
  image:{
   type:String,
   require:true
  },
  user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Image = mongoose.model("ImageDetails", ImageDetailsScehma);
module.exports = Image