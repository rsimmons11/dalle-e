// Import the 'express' framework for building web applications
import express from 'express';

// Import the 'dotenv' library for loading environment variables from a '.env' file
import * as dotenv from 'dotenv';

// Import the 'cors' middleware to enable Cross-Origin Resource Sharing
import cors from 'cors';

// Import the 'connectDB' function from './mongodb/connect.js' to establish a connection to the MongoDB database
import connectDB from './mongodb/connect.js';

// Import the 'post' and 'dalle' routers from their respective files
import post from './routes/post.js';
import dalle from './routes/dalle.js';

// Load environment variables from the '.env' file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Use the 'cors' middleware to handle Cross-Origin Resource Sharing
app.use(cors());

// Use the 'express.json' middleware to parse incoming JSON requests with a specified payload size limit
app.use(express.json({ limit: '50mb' }));

// Use the 'post' and 'dalle' routers for handling requests with specific paths
app.use('/api/v1/post', post);
app.use('/api/v1/dalle', dalle);

// Define a route to handle GET requests to the root path
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const PORT = process.env.PORT|| 8080;

// Define an asynchronous function to start the server
const startServer = async () => {
  try {
    // Connect to the MongoDB database using the 'connectDB' function and the MongoDB URL from the environment variables
    connectDB(process.env.MONGODB_URL);


    // Start the Express application on port 8080 and log a message when the server is started
    app.listen(PORT, () => console.log('Server started on port 8080'));
  } catch (error) {
    // Log any errors that occur during the server startup process
    console.log(error);
  }
};

// Invoke the 'startServer' function to start the server
startServer();
