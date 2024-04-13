import React, { useEffect, useState } from "react";
import EditCompanyModal from "./EditCompanyModal";
import Swal from "sweetalert2"; // Import SweetAlert
 
function CompaniesDetails() {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;
 
  useEffect(() => {
    fetchCompanies();
  }, []);
 
  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3001/admincompanies");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };
 
  const handleEdit = (companyId) => {
    setIsModalOpen(true);
    setSelectedCompanyId(companyId);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompanyId(null);
  };
 
  const handleDelete = async (companyId) => {
    // Display confirmation dialog
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
 
    // If user confirms deletion, proceed with deletion
    if (confirmation.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3001/admincompanies/${companyId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        fetchCompanies();
        console.log("Company deleted successfully");
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    }
  };
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredCompanies = companies.filter(
    (company) =>
      company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.phone.includes(searchQuery) ||
      company.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
 
  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Companies Details
        </h2>
        {/* Search field */}
        <div className="flex mb-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-l py-2 px-3 mr-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Filter icon */}
          {/* <FaFilter
            className="text-gray-600 cursor-pointer"
            onClick={() => fetchCompanies()}
          /> */}
        </div>
        {/* Table for displaying companies */}
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-400 text-black">
              <tr>
                <th className="py-2 px-3 text-left">Unique ID</th>
                <th className="py-2 px-3 text-left">Company Name</th>
                <th className="py-2 px-3 text-left">Location</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">Phone</th>
                <th className="py-2 px-3 text-left">Domain</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentCompanies.map((company) => (
                <tr key={company._id} className="bg-white">
                  <td className="py-2 px-3">{company.uniqueId}</td>
                  <td className="py-2 px-3">{company.companyName}</td>
                  <td className="py-2 px-3">{company.location}</td>
                  <td className="py-2 px-3">{company.email}</td>
                  <td className="py-2 px-3">{company.phone}</td>
                  <td className="py-2 px-3">{company.domain}</td>
                  <td className="py-2 px-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 my-2 rounded mr-4"
                      onClick={() => handleEdit(company)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded"
                      onClick={() => handleDelete(company._id)}
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
            disabled={indexOfLastItem >= companies.length}
          >
            Next
          </button>
        </div>
      </div>
      {/* Render the EditCompanyModal component */}
      <EditCompanyModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        companyId={selectedCompanyId}
        fetchCompanies={fetchCompanies}
      />
    </>
  );
}
 
export default CompaniesDetails;
 