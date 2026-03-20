const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({

  name: String,
  breed: String,
  age: Number,
  weight: String,
  color: String,
  image: String,
  title: String,
  description: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

});

module.exports = mongoose.model("Dog", dogSchema);