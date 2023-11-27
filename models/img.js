
const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema({
  
  image:{
   type:String,
   require:true
  },
  user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
  title:{
    type:String,
    require:true
  },
  likes: {
    type: Array,
    default: [],
  },
});

/*
ImageDetailsScehma.set("toJSON",{
  virtuals:true,
  versionKey:false,
  transform:(doc,ret) => {
    delete ret._id
  }
})
*/
const Image = mongoose.model("ImageDetails", ImageDetailsScehma);
module.exports = Image