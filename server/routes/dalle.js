// Import the 'express' framework to create a router
import express from 'express';

// Import the 'getHelloMessage' and 'postImage' functions from the '../controller/dalle.js' module
import { getHelloMessage, postImage } from '../controller/dalle.js';

// Create an instance of the Express Router
const router = express.Router();

// Define a route for handling GET requests to the root path ('/')
router.route('/').get(getHelloMessage);

// Define a route for handling POST requests to the root path ('/')
router.route('/').post(postImage);

// Export the router to be used in other parts of the application
export default router;
