const express = require('express');

const app = express();

// app.use("/hello/2",(req,res) =>{
//     res.send("Abara ka dabra");
// })

// app.use("/hello",(req,res) =>{
//     res.send("Hello hello  hello");
// })

//Dynamic routing
// app.get("/user/:userid/:name/:password",(req,res)=>{
//     console.log(req.params);
//     res.send({firstname: "vaishnavi" , lastname : "pratale"});
// });

//Multiple Route Handlers***************************************************
// app.use("/user",(req,res, next)=>{
//     console.log("Handlling the route user 1!!");
   
//     next();
// },
// (req,res,next)=>{
//     console.log("Handlling the route user 2!!");
    
//     next();
// },
// (req,res,next)=>{
//     console.log("Handlling the route user 3!!");
//     next();
// },
// (req,res,next)=>{
//     console.log("Handlling the route user 4!!");
//    next();
// },
// (req,res,next)=>{
//     console.log("Handlling the route user 5!!");
//     res.send("5th response!!");
// }
// );


//Middleware example**********************************************************************
const {adminAuth, userAuth} = require("./middlewares/auth");
// //Handle Auth middleware for all GET, POST,.....request
app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res)=>{
    res.send("User data sent");
});
app.get("/admin/getAllData", (req, res)=>{
    res.send("All data sent");
});
app.get("/admin/getDeleteData", (req, res)=>{
    res.send("deleted a user");
});
app.listen(3000,()=>{
console.log("server is successfully listening on port 3000");
});


/// API Practice
//get user by email
app.get("/user", async (req,res)=>{
    const userEmail = req.body.email;

    //if their are two users with the same emailid - use findOne()
    try{
        const user = await User.findOne({ email: userEmail});
        res.send(user);
    }
    // try{
    //  const users=   await User.find({email: userEmail});

    //  if(users.length === 0){
    //     res.status(400).send("user not found");
    //  }else{
    //     res.send(users);
    //  }
   
    catch(err){
        res.status(400).send("something went wrong");
    }
});

//Feed API - GET/feed - get all the users from the database
app.get("/feed", async (req,res)=>{
  
    try{
     const users=   await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("something went wrong");
    }
});

//Delete a user from the database
app.delete("/user", async (req,res) =>{
    const userId = req.body.userId;
    try{
        //const user = await User.findByIdAndDelete({_id : userId}); OR
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted succesfully");
    }catch(err){
        res.status(400).send("something went wrong");
    }
});

//update data of the user
app.patch("/user/:userId", async(req,res)=>{
    const userId=req.params?.userId;
    const data = req.body;
    try{
    const ALLOWED_UPDATES = [
        "photoUrl",
        "about",
        "gender",
        "age",
        "Skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k)
);
if(!isUpdateAllowed){
    throw new Error("Updates are not allowed");
}
if(data?.Skills.length > 10){
    throw new Error("Skills cannot be more than 10");
}
   
        const user=await User.findByIdAndUpdate({_id : userId}, data,{
            returnDocument:"after",
            runValidators:true,
        });

        console.log(user);
        res.send("User updated Successfully");
    }catch(err){
        res.status(400).send("UPDATE FAILED:" + err.message);
    }
});