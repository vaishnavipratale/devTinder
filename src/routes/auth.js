const express = require('express');
const authRouter = express.Router();

const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//post signup api
authRouter.post("/signup", async (req,res)=>{
    try{
    //Validation of data
    validateSignUpData(req);

    //Encrypt the password
  const {firstName, lastName, email, password}= req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);
    //creating a new instance of the user model

    const user= new User({
        firstName,
        lastName,
        email,
        password : passwordHash,
    });

    // const user = new User({
    //     firstName: "virat",
    //     lastName: "kohli",
    //     email: "virat@gmail.com",
    //     password: "virat@123"
    // });


    await user.save();
    res.send("User added successfully");
    }
    catch(err){
    res.status(400).send("ERROR:"+ err.message);
}
});

//post login API
authRouter.post("/login", async (req,res)=>{
try{
    const {email, password} = req.body;
    const user= await User.findOne({email: email});
    if(!user){
        throw new Error("INVALID credentials");//IF EMAIL ID IS NOT PRESENT IN DB
    }
    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid){
        //create a jwt token
        const token = await user.getJWT();
        
        //Add the token to cookie and send the response back to the user
        res.cookie("token" , token, { 
            expires : new Date(Date.now() + 8 * 3600000),});
        res.send("User Login Successfully");
    }else{
        throw new Error("INVALID credentials");//if password is not correct
    }
}catch(err){
    res.status(400).send("Error : " + err.message);
}
});

authRouter.post("/logout", async (req,res)=>{
 res.cookie("token", null, {
    expires: new Date(Date.now())
 });
 res.send("logout succesfull");
})
module.exports = {
    authRouter,
} ;
