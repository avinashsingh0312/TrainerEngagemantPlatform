import React, { useEffect, useState } from "react";

function PurchaseOrderComponent() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/adminpurchase-orders-details"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPurchaseOrders(data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPurchaseOrders = purchaseOrders.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Purchase Orders Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-400 text-black">
              <tr>
                <th className="py-2 px-3 text-left">Trainer Name</th>
                <th className="py-2 px-3 text-left">Trainer Email</th>
                <th className="py-2 px-3 text-left">Skills</th>
                <th className="py-2 px-3 text-left">Charge Per Day</th>
                <th className="py-2 px-3 text-left">Company Name</th>
                <th className="py-2 px-3 text-left">Location</th>
                <th className="py-2 px-3 text-left">Company Email</th>
                <th className="py-2 px-3 text-left">Company Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPurchaseOrders.map((purchaseOrder) => (
                <tr key={purchaseOrder._id} className="bg-white">
                  <td className="py-2 px-3">{purchaseOrder.trainerName}</td>
                  <td className="py-2 px-3">{purchaseOrder.trainerEmail}</td>
                  {/* <td className="py-2 px-3">{purchaseOrder.skills}</td> */}
                  <td className="py-2 px-3">
                    {Object.entries(purchaseOrder.skills).map(([key, value]) => (
                      <div key={key}>
                        <span>{key}: </span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-3">{purchaseOrder.chargePerDay}</td>
                  <td className="py-2 px-3">{purchaseOrder.companyName}</td>
                  <td className="py-2 px-3">{purchaseOrder.location}</td>
                  <td className="py-2 px-3">{purchaseOrder.companyEmail}</td>
                  <td className="py-2 px-3">{purchaseOrder.companyPhone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= purchaseOrders.length}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PurchaseOrderComponent;
