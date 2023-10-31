/*
const jwtHelpers = require("../utilits/jwtHelpers")

exports.check = (req,res,next) => {
    let token = req.headers["authorization"]

    token = token?.replace("Bearer","")?.trim()
    const payload = jwtHelpers.verify(token)
    if(payload) {
        req.userId = payload.sub
        return next()
    }else {
        res.status(401).json({
            message:"unauthzation"
        })
    }


}

*/
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user")


exports.isLoggedIn = async(req,res,next) => {
    try{
        if(req.headers.authorization) {
            return res.status(400).json({
                message:"لم يتوقر رمز الدخول"
            });
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken.verify(token,process.env.JWT_SECRET);
        req.currentUser = decoded;
        next()
    }catch(e){
        res.status(500)
    }
}

