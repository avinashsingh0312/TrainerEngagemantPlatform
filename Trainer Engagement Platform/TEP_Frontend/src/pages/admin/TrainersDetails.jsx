import React, { useEffect, useState } from "react";
import EditTrainerModal from "./EditTrainerModal";
import Swal from "sweetalert2"; // Import SweetAlert
 
function TrainersDetails() {
  const [trainers, setTrainers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;
 
  useEffect(() => {
    fetchTrainers();
  }, []);
 
  const fetchTrainers = async () => {
    try {
      const response = await fetch("http://localhost:3001/admintrainers");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };
 
  const handleDelete = async (id, email) => {
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
        // Check if trainer has any active purchase orders
        const response = await fetch(
          `http://localhost:3001/checkPurchaseOrders/${email}`
        );
        const { hasActiveOrders } = await response.json();
        if (hasActiveOrders) {
          Swal.fire("Error", "Trainer has active purchase orders!", "error");
          return;
        }
 
        await fetch(`http://localhost:3001/admintrainers/${id}`, {
          method: "DELETE",
        });
        setTrainers(trainers.filter((trainer) => trainer._id !== id));
        Swal.fire("Deleted!", "Your trainer has been deleted.", "success");
        console.log("Trainer deleted successfully:", id);
      }
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };
 
  const handleEdit = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
  };
 
  const filteredTrainers = trainers.filter((trainer) => {
    const lowercaseSearchQuery = searchQuery.toLowerCase();
    return (
      trainer.name.toLowerCase().includes(lowercaseSearchQuery) ||
      trainer.email.toLowerCase().includes(lowercaseSearchQuery) ||
      trainer.contactNumber.includes(searchQuery) ||
      Object.entries(trainer.skills).some(
        ([skillName, skillValue]) =>
          typeof skillValue === "string" &&
          (skillName.toLowerCase().includes(lowercaseSearchQuery) ||
            skillValue.toLowerCase().includes(lowercaseSearchQuery))
      )
    );
  });
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrainers = filteredTrainers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
 
  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Trainers Details</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by Name, Contact Number"
            className="border border-gray-300 px-4 py-2 rounded-md mr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            {/* Table Header */}
            <thead className="bg-gray-400 text-black">
              <tr>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">Contact</th>
                <th className="py-2 px-3 text-left">Skills</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {currentTrainers.map((trainer) => (
                <tr key={trainer._id} className="bg-white">
                  <td className="py-2 px-3">{trainer.name}</td>
                  <td className="py-2 px-3">{trainer.email}</td>
                  <td className="py-2 px-3">{trainer.contactNumber}</td>
                  <td className="py-2 px-3">
                    {Object.entries(trainer.skills).map(([key, value]) => (
                      <div key={key}>
                        <span>{key}: </span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => handleEdit(trainer)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 my-2 rounded mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trainer._id, trainer.email)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 my-2 rounded mr-4"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 my-2 rounded mr-4"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= filteredTrainers.length}
          >
            Next
          </button>
        </div>
      </div>
      {/* Edit Trainer Modal */}
      <EditTrainerModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        trainer={selectedTrainer}
        fetchTrainers={fetchTrainers}
      />
    </>
  );
}
 
export default TrainersDetails;
 