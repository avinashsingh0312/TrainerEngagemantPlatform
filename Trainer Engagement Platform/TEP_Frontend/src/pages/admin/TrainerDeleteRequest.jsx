import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
 
const TrainerDeleteRequest = () => {
  const [trainers, setTrainers] = useState([]);
 
  useEffect(() => {
    fetch('http://localhost:3001/admindeletetrainers')
      .then(response => response.json())
      .then(data => {
        setTrainers(data);
      })
      .catch(error => {
        console.error('Error fetching trainers:', error);
      });
  }, []);
 
  const handleDelete = async (trainerId) => {
    try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
          fetch(`http://localhost:3001/admindeletetrainers/${trainerId}`, {
            method: 'DELETE'
          })
            .then(() => {
              setTrainers(trainers.filter(trainer => trainer._id !== trainerId));
            })
            .catch(error => {
              console.error('Error deleting trainer:', error);
            });
        }
    } catch (error) {
        console.error('Error showing confirmation dialog:', error);
    }
};
 
  return (
    <div className="container mx-auto px-2 py-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Trainers Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-400 text-black">
            <tr>
              <th className="py-2 px-3 text-left">Name</th>
              <th className="py-2 px-3 text-left">Email</th>
              <th className="py-2 px-3 text-left">Contact Number</th>
             
              <th className="py-2 px-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trainers.map(trainer => (
              <tr key={trainer._id} className="bg-white">
               
                <td className="py-2 px-3">{trainer.name}</td>
                <td className="py-2 px-3">{trainer.email}</td>
                <td className="py-2 px-3">{trainer.contactNumber}</td>
                
                <td className="py-2 px-3">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded"
                    onClick={() => handleDelete(trainer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default TrainerDeleteRequest;