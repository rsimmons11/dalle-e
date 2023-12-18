// Import the 'mongoose' library for MongoDB object modeling
import mongoose from 'mongoose';

// Define a function 'connectDB' that takes a 'url' parameter for MongoDB connection
const connectDB = (url) => {
  // Set a mongoose option to enable strict mode for queries
  mongoose.set('strictQuery', true);
  
  // Connect to the MongoDB database using the provided URL
  mongoose.connect(url)
    .then(() => console.log('connected to mongo')) // Log a message if the connection is successful
    .catch((err) => {
      // Log an error message and details if the connection fails
      console.error('failed to connect with mongo');
      console.error(err);
    });
};

// Export the 'connectDB' function to be used in other parts of the application
export default connectDB;
