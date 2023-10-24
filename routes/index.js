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
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  
  const upload = multer({ storage: storage })

router.post("/singup",controller.register)
router.post("/login",controller.login)


router.post('/upload-image', upload.single('file'), controller.sendImages)

router.get("/get-image",controller.getImages)
    
    



module.exports = router