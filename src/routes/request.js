const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
//post sendConnectionRequest API
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user.firstName + " Connection Request sent!!");
   });

module.exports = {
    requestRouter,
};