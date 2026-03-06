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

const hostName = process.env.HOSTNAME || localhost;
const port = process.env.PORT || 3000;

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



const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlenght:[200,"caption cannot exceed 200 characters"]
  },
  
image:{
  type:string,
  required:[true,"Image URL is required"],
  trim:true
},
category:{
  type:string,
  required:[true,"Category is required"],
  trim:true
},
createdAt:{
  type:Date,
  default:Date.now
}
});


const Posts =mongoose.model("Posts",postschema);


connectDb();

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Posts.find() .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});


// Routes
app.get('/', (req, res) => {
  res.send('This is the homepage of the Cyan backend');
});

// Start server
app.listen(port, () => {
  console.log(`Cyan Server is running at http://${hostname}:${port}/`);
  console.log("Cyan API armed and ready to serve requests");
});


app.post("/api/posts", async (req, res) => {
  try {
    const { caption, image, category } = req.body;
    const newPost = new Posts({ caption, image, category });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
});