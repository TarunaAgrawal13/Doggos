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

  // GeoJSON Point for Mapbox compatibility
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    },
    address: String  // human-readable address (optional)
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

// Add 2dsphere index for geo queries
dogSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Dog", dogSchema);