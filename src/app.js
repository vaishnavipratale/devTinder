const express = require('express');

const app = express();
app.use("/test",(req,res) =>{
    res.send("Hello from the server!!");
})

app.use("/hello",(req,res) =>{
    res.send("Hello hello  hello");
})
app.use("/",(req,res) =>{
    res.send("vaishnavi pratale!");
})

app.listen(3000,()=>{
console.log("server is successfully listening on port 3000");
});