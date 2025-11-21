import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../../src/models/User.js";

const protectRoute = async (req, res, next)=>{

    try{
     const token = req.header("Authorization").replace("Bearer ", "");
    if(!token){
        res.status(401).json({message:"No authentication token, access denied"});
    }
     const decoded =  jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findById(decoded.userId).select(-password);

     if(!user){
        res.status(401).json({message:"Token is not valid"});
     }
     req.user=user;
     next();

    }catch(error){
        console.log("Error in protect middleware");
        res.status(401).json({message:"Token is not valid"});
    }
}

export default protectRoute;