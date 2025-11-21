import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


const router = express.Router();

router.get("/test",async (req,res)=> res.send("/test"));

router.post("/login", async (req,res)  =>{
    try{
 const {email , password}=req.body;

 if(!email || !password){
    return res.status(400).json({message: "All fields are required"});
 }
const user = await User.findOne({email});
if(!user){
    return res.status(400).json({message: "Email does not exist"});
}


//check password
const isPasswordCorrect = await user.comparePasswords(password);

if(!isPasswordCorrect){
   return res.status(400).json({message:"Invalid credentials"});
}

const token = generateToken(user._id);
res.status(200).json({
token,
user:{
    id:user._id,
    username:user.username,
    email:user.email,
    profileImage:user.profileImage,
},
});
}catch(error){
    console.log("Error in login route",error);
    res.status(500).json({message:"Internal server error"});}


});

//generate token function
const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "15m"});
}


router.post("/register", async(req,res)=>{
    try{
    const {email, username , password,}=req.body;
    if(!email || !username || !password){
        return res.status(400).json({message: "All fields are require "});
    }
    if(password.length < 6){
     return res.status(400).json({message: "Password should be at least 6 character long"});
    }
     if(username.length < 3){
     return res.status(400).json({message: "Username should be at least 3 character long"});
    }

//   const existingUser = await User.findOne({$or: [{email}, {username}]});
const existingEmail = await User.findOne({email});
if(existingEmail){
    return res.status(400).json({message:"Email already exists"});
}
const existingUsername = await User.findOne({username});
if(existingUsername){
    return res.status(400).json({message:"Username already exists"});
}

const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

const user = new User({
    email,
    username,
    password,
    profileImage: profileImage,
});

await user.save();

//generate token 
const token =  generateToken(user._id);

res.status(201).json({
    token,
    user:{
        id: user._id,
        username:user.username,
        email:user.email,
        profileImage: user.profileImage,
    },
});
}catch(error){
    console.log("Erorr in register route",error);
    res.status(500).json({message: "Internal server error"})
}
});

export default router;