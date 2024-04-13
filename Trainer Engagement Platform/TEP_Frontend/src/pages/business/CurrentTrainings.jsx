// Redux
// CurrentTrainings.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchInvoices } from '../../redux/actions/currentTrainingsActions';

 
const CurrentTrainings = () => {
  const { email: businessEmail } = useParams();
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.training.invoices);
 
  useEffect(() => {
    dispatch(fetchInvoices(businessEmail));
  }, [dispatch, businessEmail]);
 
  return (
    <div className="container mx-auto my-5">
      <h2 className="text-3xl font-bold mb-4 ml-5 text-center">All Training</h2>
      {/* <table className="min-w-full border border-gray-300"> */}
      <div className="flex justify-center">

      <table className="border border-gray-300" style={{ width: '85%' }}>

        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border border-gray-300 py-2 px-4">Company Name</th>
            <th className="border border-gray-300 py-2 px-4">Amount</th>
            <th className="border border-gray-300 py-2 px-4">Batches</th>
            <th className="border border-gray-300 py-2 px-4">Start Date</th>
            <th className="border border-gray-300 py-2 px-4">End Date</th>
            <th className="border border-gray-300 py-2 px-4">Technologies</th>
            <th className="border border-gray-300 py-2 px-4">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices && invoices.map((invoice) => (
            <tr key={invoice._id} className="border border-gray-300">
              <td className="border border-gray-300 py-2 px-4">{invoice.companyName}</td>
              <td className="border border-gray-300 py-2 px-4">{invoice.amount}</td>
              <td className="border border-gray-300 py-2 px-4">{invoice.batches}</td>
              <td className="border border-gray-300 py-2 px-4">
                {new Date(invoice.startDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {new Date(invoice.endDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 py-2 px-4">{invoice.technologies}</td>
              <td className="border border-gray-300 py-2 px-4">
                {invoice.paymentStatus ? 'Paid' : 'Not Paid'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};
 
export default CurrentTrainings;
 