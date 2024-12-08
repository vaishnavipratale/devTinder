const express = require('express');

const app = express();

// app.use("/hello/2",(req,res) =>{
//     res.send("Abara ka dabra");
// })

// app.use("/hello",(req,res) =>{
//     res.send("Hello hello  hello");
// })
app.get("/user",(req,res)=>{
    res.send({firstname: "vaishnavi" , lastname : "pratale"});
})

app.post("/user",(req,res)=>{
    res.send("data succefully saved to the database");
    });

app.delete("/user",(req,res)=>{
    res.send("deleted succesfully");
    })    
app.use("/test",(req,res) =>{
    res.send("Hello from the server!!");
});
app.use("/",(req,res) =>{
    res.send("vaishnavi pratale!");
})


app.listen(3000,()=>{
console.log("server is successfully listening on port 3000");
});