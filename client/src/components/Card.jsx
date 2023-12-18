// Import the 'React' library from 'react'
import React from 'react';

// Import 'download' icon and 'downloadImage' utility function
import { download } from '../assets';
import { downloadImage } from '../utils';

// Define a functional component 'Card' that takes destructured props
const Card = ({ _id, name, prompt, photo }) => {
  return (
    // Container div for the card with styling and hover effects
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      {/* Image element displaying the photo */}
      <img 
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      {/* Hidden div that appears on hover, displaying additional information */}
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        {/* Paragraph displaying the prompt */}
        <p className='text-white text-md overflow-y-auto prompt'>{prompt}</p>
        {/* Container for user information and download button */}
        <div className='mt-5 flex justify-between items-center gap-2'>
          {/* Container for user avatar and name */}
          <div className='flex items-center gap-2'>
            {/* Circular avatar displaying the first letter of the user's name */}
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
              {name[0]}
            </div>
            {/* Paragraph displaying the user's name */}
            <p className='text-white text-sm'>{name}</p>
          </div>
          {/* Download button triggering the 'downloadImage' function */}
          <button type='button' onClick={() => downloadImage(_id, photo)} className='outline-none bg-transparent border-none'>
            {/* Image icon for download */}
            <img src={download} alt='download' className='w-6 h-6 object-contain invert' />
          </button>
        </div>
      </div>
    </div>
  );
}

// Export the 'Card' component to be used in other parts of the application
export default Card;
