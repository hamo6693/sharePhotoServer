//const validate = require("../handlers/validation");
//const {SaveUser} = require("../middlewares/validators");
const multer = require("multer")
const express = require("express");
const router = express.Router();
const controller = require("../controller/authController");
const isLoggedIn  = require("../middlewares/auth");
//const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/",(req,res) => {
    res.json({
        message:"hello"
    })
})

router.post("/register",controller.register)
router.post("/login",controller.login)


//ارسال الصورة
router.post('/upload-image', upload.single("images"),isLoggedIn, controller.sendImage);

//جلب كل الصور

router.get("/get-image",controller.getImages)

//جلب صور المستخدم فقط
router.get("/get-image/:id",isLoggedIn,controller.getImagesUser)



//get title id
router.get("/edit-title/:id",isLoggedIn,controller.getImgTitle);
router.put("/edit-title/:id",isLoggedIn,controller.updateTitle);


//عمل لايك
router.put("/like/:id",isLoggedIn,controller.likeImg);

router.delete('/upload-image/:id',isLoggedIn, controller.delateImage)


module.exports = router