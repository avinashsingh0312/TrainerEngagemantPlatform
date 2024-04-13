import React, { useState } from 'react';
import Swal from "sweetalert2";
 
const BusinessRequestForm = ({ companyUniqueId }) => {
  const [businessRequest, setBusinessRequest] = useState({
    batchName: '',
    technology: '',
    numberOfTrainees: 0,
    durationOfTraining: '',
    startDate: '',
    endDate: '',
    trainingBudget: ''
  });
  const [confirmation, setConfirmation] = useState(null);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
 
    // Validate batchName and technology format
    if ((name === 'batchName' || name === 'technology') && value.trim() !== '') {
      const formattedValue = formatInput(value);
      setBusinessRequest((prevRequest) => ({ ...prevRequest, [name]: formattedValue }));
    } else {
      setBusinessRequest((prevRequest) => ({ ...prevRequest, [name]: value }));
    }
  };
 
  const formatInput = (input) => {
    // Format string to have the first letter in uppercase and the rest in lowercase
    return input.replace(/\b\w/g, (char) => char.toUpperCase());
  };
 
  const handleContinueClick = async () => {
    try {
      // Validate Start Date and End Date
      const startDate = new Date(businessRequest.startDate);
      const endDate = new Date(businessRequest.endDate);
 
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid start or end date format.');
      }
 
      if (endDate <= startDate) {
        throw new Error('End date should be greater than the start date.');
      }
 
      // Calculate Duration of Training
      const durationOfTraining = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
 
      // Update the businessRequest state with calculated duration
      setBusinessRequest((prevRequest) => ({ ...prevRequest, durationOfTraining: Number(durationOfTraining) }));
 
      // Defining Token
      const authToken = localStorage.getItem('token');
 
      // Make a POST request to your backend API with Fetch
      await fetch('http://localhost:3001/businessrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          ...businessRequest,
          uniqueId: authToken.id,
          durationOfTraining,
        }),
      });
 
      // Optionally, clear the form or take other actions upon successful submission
      //setConfirmation('Data submitted successfully.');
       // Show SweetAlert confirmation
       Swal.fire({
        icon: "success",
        title: "Request Sent Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      
      setBusinessRequest({
        batchName: '',
        technology: '',
        numberOfTrainees: 0,
        durationOfTraining: 0,
        startDate: '',
        endDate: '',
        trainingBudget: 0,
      });
    } catch (error) {
      // Handle validation or submission errors
      console.error('Error submitting business request data:', error.message);
      setConfirmation(`Error: ${error.message}`);
    }
  };
 
  return (
    <div className="container mx-auto mt-8">
    <h1 className="text-3xl font-bold mb-4 ml-5 text-center">Request Form For Trainers</h1>
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-40 mr-40">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Batch Name:</label>
          <input
            type="text"
            name="batchName"
            value={businessRequest.batchName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Technology:</label>
          <input
            type="text"
            name="technology"
            value={businessRequest.technology}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Number of Trainees:</label>
          <input
            type="number"
            name="numberOfTrainees"
            value={businessRequest.numberOfTrainees}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
      <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">Duration of Training:</label>
      <input
        type="number"  
        name="durationOfTraining"
        value={businessRequest.durationOfTraining}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      </div>
 
 
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={businessRequest.startDate}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={businessRequest.endDate}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Budget of Training:</label>
          <input
            type="number"
            name="trainingBudget"
            value={businessRequest.trainingBudget}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
 
        <div>
          <button
            type="button"
            onClick={handleContinueClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
 
      {confirmation && (
        <div className={`mt-4 ${confirmation.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {confirmation}
        </div>
      )}
    </div>
    </div>
  );
};
 
export default BusinessRequestForm;
 
 
 