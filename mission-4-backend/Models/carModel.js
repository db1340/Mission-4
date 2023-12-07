// carmodel.js
const mongoose = require("mongoose");

// Car schema
const carSchema = new mongoose.Schema({
  carbrand: {
    type: String,
    required: true,
  },
  cartype: {
    type: String,
    required: true,
  },
  caryear: {
    type: Number,
    required: true,
  },
  carprice: {
    type: Number,
    required: true,
  },
  carimage: {
    type: String,
    required: true,
  },
});

// Car model
const CarModel = mongoose.model("cars", carSchema);

module.exports = CarModel;
