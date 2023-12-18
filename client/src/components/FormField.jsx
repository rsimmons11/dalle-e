// Import the 'React' library from 'react'
import React from 'react';

// Define a functional component 'FormField' that takes destructured props
const FormField = ({ LabelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    // Container div for the form field
    <div>
      {/* Container for label and optional 'Surprise Me' button */}
      <div className='flex items-center gap-2 mb-2'>
        {/* Label element for the form field */}
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-900'
        >
          {LabelName}
        </label>
        {/* 'Surprise Me' button (conditionally rendered based on 'isSurpriseMe' prop) */}
        {isSurpriseMe && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'
          >
            surprise me
          </button>
        )}
      </div>
      {/* Input element for the form field */}
      <input 
        type={type} 
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
      />
    </div>
  );
}

// Export the 'FormField' component to be used in other parts of the application
export default FormField;
