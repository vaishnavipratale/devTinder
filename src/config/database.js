const mongoose = require('mongoose');

const connectDB =async()=>{
await mongoose.connect(
    "mongodb+srv://pratalev:6qLYgiArWRRKO7qn@cluster0.f5gfw.mongodb.net/devTinder");
};
module.exports = connectDB;

