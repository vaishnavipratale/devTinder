const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {ConnectionRequest} = require("../models/connectionRequest");
const User = require("../models/user");

const sendEmail = require("../utils/sendEmail");
//post sendConnectionRequest API
requestRouter.post("/request/send/:status/:toUserId", 
     userAuth, async (req, res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type:" + status});
        }

        //If their is an existing connectionRequest
        const  existingConnectionRequest= await ConnectionRequest.findOne({
        $or:[{ fromUserId , toUserId },
             {fromUserId : toUserId , toUserId : fromUserId},         
        ]
        });
        if(existingConnectionRequest) {
            return res.status(404).json({message : "Connection request is already exist!!"});
        }
       
        //check if this  toUserId is existing in db or not
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message : "User not found!"});
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        
        const data = await connectionRequest.save();

        const emailRes = await sendEmail.run(
            "A new friend request from " + req.user.firstName,
            req.user.firstName + " is " + status + " in " + toUser.firstName
          );
          console.log(emailRes);
        res.json({
            message:req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
        });
    }catch(err){
        res.status(404).send("Error:" + err.message);
    }

   });

requestRouter.post("/request/review/:status/:requestId", 
    userAuth, async (req,res)=>{
        try{
            const loggedInUser = req.user;
            const {status, requestId} = req.params;
            const allowedStatus = ["accepted", "rejected"];

        if(!allowedStatus.includes(status)){
            res.status(400).json({message : "Status not Allowed"});
            }
          //validations
            const connectionRequest = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId : loggedInUser._id,
                status : "interested",
            })
            if(!connectionRequest){
                return res.status(404).json({message: "Connection request not found"})
            }
           connectionRequest.status = status;
           const data = await connectionRequest.save();
           res.json({message: "connection request" + status, data});
        }catch(err){
            res.status(400).send("Error:" + err.message);
        }

});

module.exports = {
    requestRouter,
};