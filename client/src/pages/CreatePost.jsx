// Import the 'React' and 'useState' libraries from 'react'
import React, { useState } from 'react';

// Import the 'useNavigate' hook from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

// Import various assets and utility functions
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

// Define the 'CreatePost' functional component
const CreatePost = () => {
  // Access the 'navigate' function from the 'useNavigate' hook
  const navigate = useNavigate();

  // State to manage form data, image generation status, and loading status
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle form input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Function to handle 'Surprise Me' button click
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

// Function to generate an image using DALL-E AI
const generateImage = async () => {
  // Check if a prompt is provided in the form
  if (form.prompt) {
    try {
      // Set the state to indicate that image generation is in progress
      setGeneratingImg(true);

      // Send a POST request to the DALL-E API with the provided prompt
      const response = await fetch('https://imagegen-1nel.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: form.prompt,
        }),
      });

      // Parse the response JSON data
      const data = await response.json();

      // Update the form state with the generated image data
      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
    } catch (err) {
      // Display an alert if there is an error during the image generation process
      alert(err);
    } finally {
      // Set the state to indicate that image generation is complete
      setGeneratingImg(false);
    }
  } else {
    // Display an alert if no prompt is provided
    alert('Please provide a proper prompt');
  }
};

// Function to handle form submission
const handleSubmit = async (e) => {
  // Prevent the page from refreshing
  e.preventDefault();

  // Check if both prompt and photo are provided in the form
  if (form.prompt && form.photo) {
    // Set the loading state to indicate that the submission is in progress
    setLoading(true);

    try {
      // Send a POST request to the server with the form data
      const response = await fetch('https://imagegen-1nel.onrender.com/api/v1/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form }),
      });

      // Parse the response JSON data
      await response.json();

      // Display a success alert
      alert('Success');

      // Navigate to the home page after successful submission
      navigate('/');
    } catch (err) {
      // Display an alert if there is an error during the submission process
      alert(err);
    } finally {
      // Set the loading state to indicate that the submission is complete
      setLoading(false);
    }
  } else {
    // Display an alert if either the prompt or the photo is missing
    alert('Please generate an image with proper details');
  }
};

  return (
    <section className="max-w-7xl mx-auto">
      {/* Header section */}
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      {/* Form for creating a post */}
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        {/* Form fields section */}
        <div className="flex flex-col gap-5">
          {/* Form field for the user's name */}
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          {/* Form field for the prompt with 'Surprise Me' button */}
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* Container for displaying the generated image preview */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {/* Display the generated image or a preview image */}
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {/* Loader overlay while generating the image */}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Button for generating the image */}
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {/* Information and button for sharing the generated image */}
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;