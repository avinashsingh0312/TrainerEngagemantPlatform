import React, { useState } from "react";
import Swal from "sweetalert2";

function BusinessRequestModal({ isOpen, onClose, request }) {
  const [email, setEmail] = useState("");
  const [calculatedBudget, setCalculatedBudget] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");

  // Function to calculate price per day
  const calculatePricePerDay = () => {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    const durationInMilliseconds = endDate - startDate;
    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    const durationOfTraining = request.durationOfTraining;
    const trainingBudget = request.trainingBudget;

    if (durationOfTraining <= 0) {
      return "Invalid duration";
    }

    const pricePerDay = trainingBudget / (durationInDays * durationOfTraining);
    return isNaN(pricePerDay) ? "Invalid price" : pricePerDay.toFixed(2);
  };

  // Function to handle form submission
  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3001/adminpurchase-orders",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           businessRequestId: request._id,
  //           trainerEmail: email,
  //           amount: calculatedBudget,
  //           status: false,
  //           startDate: request.startDate,
  //           endDate: request.endDate,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     Swal.fire({
  //       icon: "success",
  //       title: "Request Accepted",
  //       text: "Business request has been accepted successfully!",
  //     });
  //     const responseData = await response.json();
  //     console.log("Purchase order created:", responseData);

  //     onClose();
  //   } catch (error) {
  //     console.error("Error creating purchase order:", error);
  //   }
  // };


  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/admininterview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessRequestId: request._id,
          trainerEmail: email,
          interviewDate,
          interviewTime,
          trainingBudget: calculatedBudget,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      Swal.fire({
               icon: "success",
               title: "Intervies Schedule",
               text: "Interview has been scheduled successfully!",
            });

      const responseData = await response.json();
      console.log("Interview created:", responseData);

      onClose();
    } catch (error) {
      console.error("Error creating interview:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg w-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Submit Business Request
        </h2>
        {/* Display static data from business request */}
        <div className="mb-4 text-gray-700">
          <p>
            <strong>Batch Name:</strong> {request.batchName}
          </p>
          <p>
            <strong>Technology:</strong> {request.technology}
          </p>
          <p>
            <strong>Start Date:</strong> {request.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {request.endDate}
          </p>
          <p>
            <strong>Training Budget:</strong> {request.trainingBudget}
          </p>
          <p>
            <strong>Price Per Day:</strong> {calculatePricePerDay()}
          </p>
        </div>
        {/* Input fields for Trainer Email and Calculated Budget */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Trainer Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Trainer Email"
          />
        </div>


        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Calculated Budget:</label>
          <input
            type="number"
            value={calculatedBudget}
            onChange={(e) => setCalculatedBudget(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Calculated Budget"
          />
        </div>


        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Interview Date:</label>
          <input
            type="date"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Interview Time:</label>
          <input
            type="time"
            value={interviewTime}
            onChange={(e) => setInterviewTime(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {/* Submit and Cancel buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 my-2 rounded mr-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusinessRequestModal;
