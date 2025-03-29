require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {

  await mongoose.connect("mongodb+srv://pratalev:eYMZPvJtmszux7DT@cluster0.f5gfw.mongodb.net/devTinder");
};

module.exports = connectDB;