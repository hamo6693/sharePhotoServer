//const validate = require("../handlers/validation");
//const {SaveUser} = require("../middlewares/validators");
const multer = require("multer")
const express = require("express");
const router = express.Router();
const controller = require("../controller/authController");
const isLoggedIn  = require("../middlewares/auth");
//const auth = require("../middlewares/auth");


router.get("/",(req,res) => {
    res.json({
        message:"hello"
    })
})


router.post("/register",controller.register)
router.post("/login",controller.login)

//ارسال كل مستخدم صورة

router.post('/upload-image/:id',isLoggedIn, controller.sendImage)

//جلب الصور

router.get("/get-image",controller.getImages)

router.post('/upload-image',isLoggedIn, controller.sendImage);



router.delete('/upload-image/:id',isLoggedIn, controller.delateImage)

router.get("/get-image/:id",isLoggedIn,controller.getImages)

    



module.exports = router