
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageDetailsScehma = new mongoose.Schema({
   image:{ 
     type:String
    }
  
  });

const ImageDetails = mongoose.model("ImageDetails", ImageDetailsScehma);
module.exports = ImageDetails