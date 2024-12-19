const express = require('express');
const profileRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");

//get profile api
profileRouter.get("/profile/view", userAuth, async (req,res) => {
    try{
      const user = req.user;
      res.send(user);
    }catch(err){
       res.status(400).send("Error : " + err.message);
   }
     //console.log(cookies);
   });

//patch profile edit
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    console.log("loggedInUser");
    Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({message: `${loggedInUser.firstName} , your profile updated successfully`,
      data:loggedInUser,
      });
  }catch(err){
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = {
  profileRouter,
};