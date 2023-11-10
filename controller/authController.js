const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwtHelpers = require("../utilits/jwtHelpers");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const Image = require("../models/img");

exports.register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  try {
    const user = await User({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      confPassword: bcrypt.hashSync(password, 8),
    });
    await user.save();
    res.status(200).json({ message: "تم انشاء الحساب" });
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

exports.sendImage = async (req, res) => {
  // مع الطلب user  الخاص بالـ id لم ترسل ال
  const { id } = req.params;
  const { base64 } = req.body;

  try {
    const users = await Image.create({
      // هنا user لم تمرر ال
      image: base64,
      /*user: id,*/
      
      user: req.currentUser.id,
      
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
