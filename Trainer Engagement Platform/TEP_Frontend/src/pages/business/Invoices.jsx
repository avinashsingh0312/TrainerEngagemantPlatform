import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
 
const Invoices = ({ email }) => {
  const { email: businessEmail } = useParams(); // Extract email id from the URL
  const [businessInvoices, setBusinessInvoices] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all details for a particular business using businessEmail
        const response = await fetch(`http://localhost:3001/businessinvoices/${businessEmail}`);
        if (!response.ok) {
          throw new Error(`Error fetching business invoices: ${response.statusText}`);
        }
 
        const data = await response.json();
        setBusinessInvoices(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [businessEmail]); // Fetch data whenever businessEmail changes

    // Accepting or Rejecting Invoice
    const handleInvoiceAction = async (invoice, action) => {
      try {
        let method, endpoint;
  
        // Determine method and endpoint based on the action
        if (action === "accept") {
          method = "PUT";
          endpoint = `http://localhost:3001/businessinvoices/${invoice._id}/accept`;
        } else if (action === "reject") {
          method = "DELETE";
          endpoint = `http://localhost:3001/businessinvoices/${invoice._id}/reject`;
        } else {
          throw new Error("Invalid action");
        }
  
        // Update paymentStatus based on the action (accept or reject)
        const response = await fetch(endpoint, {
          method: method,
        });
  
        if (!response.ok) {
          throw new Error(`Error updating/deleting invoice: ${response.statusText}`);
        }
  
        // Update the invoice in the frontend state
        if (action === "accept") {
          const updatedInvoice = await response.json();
          const updatedInvoices = businessInvoices.map((inv) =>
            inv._id === updatedInvoice._id ? updatedInvoice : inv
          );
          setBusinessInvoices(updatedInvoices);
        } else if (action === "reject") {
          const updatedInvoices = businessInvoices.filter((inv) => inv._id !== invoice._id);
          setBusinessInvoices(updatedInvoices);
        }

          // Show SweetAlert confirmation with appropriate icon for accept or reject
      Swal.fire({
        icon: action === "accept" ? "success" : "error",
        title: action === "accept" ? "Invoice Accepted!" : "Invoice Rejected!",
        showConfirmButton: false,
        timer: 1500,
      });      
    } catch (err) {
      console.error(err);
      alert(`Error processing invoice: ${err.message}`);
    }

    };
  
 
  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black ml-5 text-center">Business Invoices</h2>
        <div>
          {businessInvoices.map((invoice) => (
            <div key={invoice._id} className="border shadow-md p-4 rounded-md mb-4">
              <div>Company Name: {invoice.companyName}</div>
              <div>Amount: {invoice.amount}</div>
              <div>Batch: {invoice.batches}</div>
              <div>Start Date: {new Date(invoice.startDate).toLocaleDateString()}</div>
              <div>End Date: {new Date(invoice.endDate).toLocaleDateString()}</div>
              <div>Payment Status: {invoice.paymentStatus ? 'Paid' : 'Not Paid'}</div>
              <div className="mt-4">
                <button
                  onClick={() => handleInvoiceAction(invoice, "accept")}
                  disabled={invoice.paymentStatus}
                  className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 ${invoice.paymentStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleInvoiceAction(invoice, "reject")}
                  disabled={invoice.paymentStatus}
                  className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${invoice.paymentStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
 
export default Invoices;
