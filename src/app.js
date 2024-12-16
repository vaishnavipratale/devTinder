const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("./utils/validation");

//middleware
app.use(express.json());
//post SignUp API
app.post("/signup", async (req,res)=>{
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
app.post("/login", async (req,res)=>{
try{
    const {email, password} = req.body;
    const user= await User.findOne({email: email});
    if(!user){
        throw new Error("INVALID credentials");//IF EMAIL ID IS NOT PRESENT IN DB
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){
        res.send("User Login Successfully");
    }else{
        throw new Error("INVALID credentials");//if password is not correct
    }
}catch(err){
    res.status(400).send("Error : " + err.message);
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
connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("server is successfully listening on port 7777");
        });
})
.catch((err)=>{
    console.error("Database cannot be connected");
})
