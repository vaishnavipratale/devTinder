const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");
//middleware
app.use(express.json());
app.use(cookieParser());
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

//get profile api
app.get("/profile", userAuth, async (req,res) => {
 try{
   const user = req.user;
   res.send(user);
 }catch(err){
    res.status(400).send("Error : " + err.message);
}
  //console.log(cookies);
});

//post sendConnectionRequest API
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
 const user = req.user;
 res.send(user.firstName + " Connection Request sent!!");
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
