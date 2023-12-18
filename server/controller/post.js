// Import the 'express' framework for building web applications
import express from 'express';

// Import the 'dotenv' library for loading environment variables from a '.env' file
import * as dotenv from 'dotenv';

// Import the 'cloudinary' library for working with the Cloudinary API
import { v2 as cloudinary } from 'cloudinary';

// Import the 'Post' model from '../models/post.js'
import Post from '../models/post.js';

// Load environment variables from the '.env' file
dotenv.config();

// Create an instance of the Express Router
const router = express.Router();

// Configure Cloudinary with API credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define a function to handle GET requests to retrieve all posts
export const getPosts = async (req, res) => {
  try {
    // Retrieve all posts from the 'Post' model
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    // Handle errors when fetching posts
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
}

// Define a function to handle POST requests to create a new post
export const createPost = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, prompt, photo } = req.body;

    // Upload the photo to Cloudinary and get the URL
    const photoUrl = await cloudinary.uploader.upload(photo);

    // Create a new post in the 'Post' model with the extracted data
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    })

    // Send a JSON response indicating success and including the new post data
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    // Handle errors when creating a new post
    res.status(500).json({ success: false, message: error });
  }
}

// Export the router to be used in other parts of the application
export default router;
