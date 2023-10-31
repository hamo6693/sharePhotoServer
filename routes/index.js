const validate = require("../handlers/validation");
const {SaveUser} = require("../middlewares/validators");
const multer = require("multer")
const express = require("express");
const router = express.Router();
const controller = require("../controller/authController");
const { isLoggedIn } = require("../middlewares/auth");
const auth = require("../middlewares/auth");


router.get("/",(req,res) => {
    res.json({
        message:"hello"
    })
})


router.post("/singup",controller.register)
router.post("/login",controller.login)

router.post('/upload-image', controller.sendImages)

router.get("/get-image",controller.getImages)

router.get("/:id",controller.find)
    



module.exports = router