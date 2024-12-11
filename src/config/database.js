const mongoose = require('mongoose');

const connectDB =async()=>{
await mongoose.connect(
    "mongodb+srv://pratalev:wemyGzQ3qnNqBLWf@cluster0.f5gfw.mongodb.net/devTinder");
};
module.exports = connectDB;

