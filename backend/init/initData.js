const mongoose = require("mongoose");
const Dog = require("../models/Dog");
const dogs = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/dogAdoption";

async function initDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected");

    await Dog.deleteMany({});
    await Dog.insertMany(dogs);

    console.log("Database initialized successfully 🐶");

    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
}

initDB();