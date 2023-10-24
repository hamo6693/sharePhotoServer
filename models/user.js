const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        maxlength:100,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    confPassword:{
        type:String,
        required:true,
    },
     
})

const Model = mongoose.model("User",ModelSchema)
module.exports = Model
