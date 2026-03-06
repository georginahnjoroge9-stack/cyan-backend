const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const connectDb = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("Check URI");
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });

    console.log("Mongo Atlas connected successfully");
  } catch (err) {
    console.error("Mongo Atlas connection Error:", err);
    process.exit(1);
  }
};

// Call the database connection
connectDb();

const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
  res.send('This is the homepage of the Cyan backend');
});

// Start server
app.listen(port, () => {
  console.log(`Cyan Server is running at http://${hostname}:${port}/`);
  console.log("Cyan API armed and ready to serve requests");
});