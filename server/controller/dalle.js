import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Define a function to handle GET requests and send a JSON response with a hello message
export const getHelloMessage = (req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
};

// Define an asynchronous function to handle POST requests for image generation
export const postImage = async (req, res) => {
  try {
    // Extract the 'prompt' from the request body
    const { prompt } = req.body;

    // Call the OpenAI API to generate an image based on the provided prompt
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    // Extract the generated image data from the API response
    const image = aiResponse.data.data[0].b64_json;

    // Send a JSON response with the generated image data
    res.status(200).json({ photo: image });
  } catch (error) {
    // Log any errors that occur during the image generation process
    console.error(error);

    // Send a 500 Internal Server Error response with the error message or a default message
    res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
  }
};
