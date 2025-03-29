    const jwt = require("jsonwebtoken");
    const User = require("../models/user");
    
    const userAuth = async (req, res, next)=>{
     try{
       const cookies = req.cookies;
       const {token } = cookies;
       if(!token){
        return res.status(401).send("Please Login !!");
       }
       //validate my token
       const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
       console.log(decodedObj);
     
       const {_id}=decodedObj;
    //    console.log("Logged in user is:" + _id);
       
        const user = await User.findById(_id);
        if(!user){
         throw new Error("User not found");
        }
        req.user = user;
       next();
      }catch(err){
         res.status(400).send("Error : " + err.message);
     }
    };
    module.exports={
       
        userAuth,
    }