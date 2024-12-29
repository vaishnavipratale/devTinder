const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {ConnectionRequest} = require("../models/connectionRequest");
// Get all the pending connection request for all the loggedIn users
userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
    try{
   const loggedInUser = req.user;

   const connectionRequests = await ConnectionRequest.find({
    toUserId: loggedInUser._id,
    status: "interested"
   }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "about", "gender", "Skills", ]);
   //   }).populate("fromUserId", "firstName lastName", ]); both work same by passing only string 

   res.json({
    message: "Data fetch successfully",
    data: connectionRequests,
   })
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req,res) => {
    try{
      const loggedInUser = req.user;

      const connectionRequests = await ConnectionRequest.find({
        $or:[
            {toUserId: loggedInUser._id, status:"accepted"},
            {fromUserId:loggedInUser._id, status:"accepted"}
      ],
      }).populate("fromUserId",["firstName", "lastName", "photoUrl", "about", "gender", "Skills", ])
      .populate("toUserId",["firstName", "lastName", "photoUrl", "about", "gender", "Skills",]);
      
      console.log(connectionRequests);
     const data = connectionRequests.map((row) => {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
           return row.toUserId;
        }
          return row.fromUserId;
     });

      res.json({data});
    }catch(err){
        res.status(400).send({message : err.message });
    }
});
module.exports = { userRouter};
