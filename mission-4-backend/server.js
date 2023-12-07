// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CarModel = require('./Models/carModel');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3001; //Port

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Routes
app.get('/cars', async (req, res) => {
    try {
        const cars = await CarModel.find();
        console.log(cars)
        
        res.status(200).json(cars);
      } catch (error) {
        console.error("Error getting cars:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});


// MongoDB connection and Server start
mongoose
  .connect("mongodb://127.0.0.1:27017/Turners",{
    serverSelectionTimeoutMS: 5000, // Increase the timeout value
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  })

