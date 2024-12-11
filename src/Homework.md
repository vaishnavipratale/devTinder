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