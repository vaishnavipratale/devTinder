const express = require('express');

const app = express();

// app.use("/hello/2",(req,res) =>{
//     res.send("Abara ka dabra");
// })

// app.use("/hello",(req,res) =>{
//     res.send("Hello hello  hello");
// })
app.get("/user/:userid/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstname: "vaishnavi" , lastname : "pratale"});
});

app.listen(3000,()=>{
console.log("server is successfully listening on port 3000");
});