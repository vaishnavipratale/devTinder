const express = require("express");
const connectDB=require("./config/database");
const User = require("./models/user");

const app = express();

//middleware
app.use(express.json());

app.post("/signup", async (req,res)=>{
    //creating a new instance of the user model

    const user= new User(req.body);

    // const user = new User({
    //     firstName: "virat",
    //     lastName: "kohli",
    //     email: "virat@gmail.com",
    //     password: "virat@123"
    // });

    try{
await user.save();
res.send("User added successfully");
}catch(err){
    res.status(400).send("error saving the user:"+ err.meassage);
}
});

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
app.patch("/user", async(req,res)=>{
    const userId=req.body.userId;
    const data = req.body;
    try{
        await User.findByIdAndUpdate({_id : userId}, data);
        res.send("User updated Successfully");
    }catch(err){
        res.status(400).send("something went wrong");
    }
});
connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("server is successfully listening on port 7777");
        });
})
.catch((err)=>{
    console.error("Database cannot be connected");
})
