import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
 
const CompaniesDeleteRequest = () => {
  const [companies, setCompanies] = useState([]);
 
  useEffect(() => {
    fetch('http://localhost:3001/admincompanydeleterequest')
      .then(response => response.json())
      .then(data => {
        setCompanies(data);
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
      });
  }, []);
 
  const handleDelete = async (companyId) => {
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
          fetch(`http://localhost:3001/admindeleterequest/${companyId}`, {
            method: 'DELETE'
          })
            .then(() => {
              setCompanies(companies.filter(company => company._id !== companyId));
            })
            .catch(error => {
              console.error('Error deleting company:', error);
            });
        }
    } catch (error) {
        console.error('Error showing confirmation dialog:', error);
    }
};
 
  return (
    <div className="container mx-auto px-2 py-4">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Company Deletion Requests
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-400 text-black">
            <tr>
              <th className="py-2 px-3 text-left">Company Name</th>
              <th className="py-2 px-3 text-left">Location</th>
              <th className="py-2 px-3 text-left">Phone</th>
              <th className="py-2 px-3 text-left">Email</th>
              <th className="py-2 px-3 text-left">Domain</th>
              <th className="py-2 px-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.map(company => (
              <tr key={company._id} className="bg-white">
                <td className="py-2 px-3">{company.companyName}</td>
                <td className="py-2 px-3">{company.location}</td>
                <td className="py-2 px-3">{company.phone}</td>
                <td className="py-2 px-3">{company.email}</td>
                <td className="py-2 px-3">{company.domain}</td>
                <td className="py-2 px-3">
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
    </div>
  );
};
 
export default CompaniesDeleteRequest;