const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Image = require("../models/img");

exports.register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  
  try {
    const hashPassword = await bcrypt.hashSync(password,10)
    const findEmail = await User.findOne({email})
    
    if(findEmail === null && password == confPassword) {
    const user = await User({
      name,
      email,
      password: hashPassword,
      confPassword: hashPassword,
    })
    await user.save()
    res.status(201).json({message:"created account"})
    
  }else{
    res.status(400).json({message:"خطا في البريد الالكتروني او كلمة المرور"})

  }
    
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "البريد خطا",
      });
    }
    const authSuccess = await bcrypt.compare(password, user.password);
    if (authSuccess) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );
      req.currentUserId = token;
      res.status(200).json({ accessToken: token });
      console.log("تم تسجيل الدخول");
    } else {
      res
        .status(404)
        .json({ message: "الرجاء التاكد من البريد الالكتروني او كلمة المرور" });
    }
  } catch (e) {
    console.log(e);
  }
};


exports.sendImage = async (req, res) => {
  // مع الطلب user  الخاص بالـ id لم ترسل ال
  const { id } = req.params;
  const { base64,title,description } = req.body;
  

  try {
    const users = await Image.create({
      // هنا user لم تمرر ال
      image: base64,
      //id img
      user: id,
      //user account
      user: req.currentUser.id,
      title:title,
      description:description,
    }).then((users) => {
      res.send({ status: "تم ارسال الصورة" , users })
    })
    
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.getImages = async (req, res) => {
  try {
    await Image.find({}).then((data) => {
      res.send({ status: "okok", data: data });
    });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
};

exports.getImagesUser = async (req,res) => {
  const { id } = req.params;
  try{
    await Image.find({
      user: id,
      user: req.currentUser.id
    }).then(data => {
      res.send({ status: "ok", data: data });
    })
  }catch(e){
    console.log(e)
  }
}

//get on post
exports.getImgTitle = async (req,res) => {
   const { id } = req.params;
   try {
      const getTitle = await Image.findById(id)
       res.json({
        sucess:true,
        data:getTitle
      })
      
    
   } catch (e) {
     res.status(500).json(e);
   }
}

exports.updateTitle = async (req,res) => {
  const { id } = req.params;
  const { title,description,base64 } = req.body;
  
     await Image.updateOne(
      {_id:id},
      {
        $set:{title,description,image:base64}
      }
      
      )
     res.json({
      message:true,

     })
  
}


exports.likeImg = async(req,res) => {
  const {id} = req.params
  const {user} = req.body
  try {
    const post = await Image.findByIdAndUpdate(id);
    if (!post.likes.includes(user)) {
      await post.updateOne({ $push: { likes:user } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: user } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

//دالة حذف الصور
exports.delateImage = async (req, res) => {
  const { id } = req.params;
  try {
    const delateImg = await Image.deleteOne({
      _id: id,
    });
    res.json({ status: "تم الحذف " });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
};


exports.getProfile = async (req,res) => {
  const { id } = req.params;
  const { name } = req.body;
  try{
    const users = await User.findOne({
      user: id,    
    })
    res.status(200).json(users.name)
    
  }catch(e){
    console.log(e)
  }
}

