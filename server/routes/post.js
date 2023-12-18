// Import the 'express' framework to create a router
import express from 'express';

// Import the 'getPosts' and 'createPost' functions from the '../controller/post.js' module
import { getPosts, createPost } from '../controller/post.js';

// Create an instance of the Express Router
const router = express.Router();

// Define a route for handling GET requests to the root path ('/') to retrieve all posts
router.route('/').get(getPosts);

// Define a route for handling POST requests to the root path ('/') to create a new post
router.route('/').post(createPost);

// Export the router to be used in other parts of the application
export default router;
