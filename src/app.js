const express = require('express');
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

connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("server is successfully listening on port 7777");
        });
})
.catch((err)=>{
    console.error("Database cannot be connected");
})
