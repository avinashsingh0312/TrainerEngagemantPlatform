import React, { useState, useEffect } from "react";

const TrainerInvoicesTable = () => {
  const [trainerInvoices, setTrainerInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set according to your preference
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/admintrainerinvoices`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTrainerInvoices(data);
        // Assuming your API returns total count of invoices
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const generateInvoice = async (invoice) => {
    try {
      await fetch("http://localhost:3001/adminbusinessinvoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoiceId: invoice._id,
          poId: invoice.poId,
          businessId: invoice.businessId,
          totalAmount: invoice.amount,
          batches: "Some batches", // You can modify this as needed
          startDate: invoice.startDate,
          endDate: invoice.endDate,
          technologies: "Some technologies", // You can modify this as needed
          paymentStatus: false,
        }),
      });
      alert("Invoice generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate invoice");
    }
  };

  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  // Logic to calculate index of the last and first items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = trainerInvoices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Trainer Invoices</h2>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-400 text-black">
              <tr>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">Contact Number</th>
                <th className="py-2 px-3 text-left">Amount</th>
                <th className="py-2 px-3 text-left">Start Date</th>
                <th className="py-2 px-3 text-left">End Date</th>
                <th className="py-2 px-3 text-left">Payment Status</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentInvoices.map((invoice) => (
                <tr key={invoice._id} className="bg-white">
                  <td className="py-2 px-3">{invoice.name}</td>
                  <td className="py-2 px-3">{invoice.email}</td>
                  <td className="py-2 px-3">{invoice.contactNumber}</td>
                  <td className="py-2 px-3">{invoice.amount}</td>
                  <td className="py-2 px-3">
                    {new Date(invoice.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3">
                    {new Date(invoice.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3">
                    {invoice.paymentStatus ? "Paid" : "Not Paid"}
                  </td>
                  <td className="py-2 px-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 my-2 rounded mr-4"
                      onClick={() => generateInvoice(invoice)}
                    >
                      Generate Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default TrainerInvoicesTable;
