const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/dogAdoption";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected Successfully 🐶");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
}

module.exports = connectDB;