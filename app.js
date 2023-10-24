require("dotenv").config()
const express = require("express");
const cors = require('cors');
const router = require("./routes");
const morgan = require("morgan")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//app.use(expressValidator());
app.use("/",router)

const dbOption = {useNewUrlParser:true,useUnifiedTopology:true}

mongoose.connect(process.env.DB_URL,dbOption)

.then(() => console.log("dbConnected"))
.catch(err=>console.log(err))



app.listen(port,()=>{
    console.log("server is started on port " + port);
})



module.exports = app