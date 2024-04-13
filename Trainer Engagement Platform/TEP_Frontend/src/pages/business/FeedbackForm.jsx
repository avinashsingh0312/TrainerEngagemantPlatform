import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
 
const FeedbackForm = ({ email }) => {
  const [feedbackData, setFeedbackData] = useState({
    company_id: email,
    trainer_name: "",
    trainer_id: "",
    stars: "",
    feedback_description: "",
  });
 
  const [trainerEmails, setTrainerEmails] = useState([]);
 
  useEffect(() => {
    const getTrainerEmails = async () => {
      try {
        const response = await fetch("http://localhost:3001/trainers");
        if (response.ok) {
          const data = await response.json();
          const emails = data.map((trainer) => trainer.email);
          setTrainerEmails(emails);
        } else {
          console.error("Failed to fetch trainer emails");
        }
      } catch (error) {
        console.error("Error fetching trainer emails:", error);
      }
    };
 
    getTrainerEmails();
  }, []);
 
  const handleChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await fetch("http://localhost:3001/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });
 
      if (response.ok) {
        setFeedbackData({
          company_id: "",
          trainer_name: "",
          trainer_id: "",
          stars: "",
          feedback_description: "",
        });

        // Show SweetAlert confirmation
       Swal.fire({
        icon: "success",
        title: "Feedback Submitted Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error:", error);
      //alert("Error submitting feedback. Please try again.");
      // Show SweetAlert confirmation
      Swal.fire({
        icon: "error",
        title: "Error submitting feedback! Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
 
  

  return (
    <div className="container mx-auto mt-8">
    <h1 className="text-3xl font-bold mb-4 ml-5 text-center"> Feedback to Trainer </h1>
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-40 mr-40">

    <form className="space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          htmlFor="company_id"
          className="block text-sm font-bold text-gray-700 mb-1"
        >
          Company Email:
        </label>
        <input
          type="email"
          id="company_id"
          name="company_id"
          value={feedbackData.company_id}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          readOnly
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="trainer_name"
          className="block text-sm font-bold text-gray-700 mb-1"
        >
          Trainer Email:
        </label>
        <select
          id="trainer_name"
          name="trainer_name"
          value={feedbackData.trainer_name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Trainer Email</option>
          {trainerEmails.map((trainerEmail, index) => (
            <option key={index} value={trainerEmail}>
              {trainerEmail}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="stars"
          className="block text-sm font-bold text-gray-700 mb-1"
        >
          Rating out of 10:
        </label>
        <input
          type="number"
          id="stars"
          name="stars"
          min="0"
          max="10"
          value={feedbackData.stars}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="feedback_description"
          className="block text-sm font-bold text-gray-700 mb-1"
        >
          Feedback Description:
        </label>
        <textarea
          id="feedback_description"
          name="feedback_description"
          value={feedbackData.feedback_description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Submit Feedback
      </button>
    </form>
  </div>
  </div>
  );
};
 
export default FeedbackForm;
