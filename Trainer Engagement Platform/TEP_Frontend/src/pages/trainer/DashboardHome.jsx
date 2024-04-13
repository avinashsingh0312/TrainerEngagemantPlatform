import React from 'react';
import { useState, useEffect } from 'react';
 
const DashboardHome = ({ email, setSelectedLink }) => {
  const [count, setCount] = useState(null);
  const [totalTrainings, setTotalTrainings] = useState(null);
  const [currentTrainings, setCurrentTrainings] = useState([]);
  const [emailId, setEmailId] = useState(email);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total purchase orders count
        const responseCount = await fetch(`http://localhost:3001/purchase-orders/count/${emailId}`);
        const countData = await responseCount.json();
        setCount(countData.count);
 
        // Fetch total trainers count
        const responseTotalTrainings = await fetch(`http://localhost:3001/total-trainers/${emailId}`);
        const totalTrainingsData = await responseTotalTrainings.json();
        setTotalTrainings(totalTrainingsData.count);
 
        // Fetch current trainings
        const responseCurrentTrainings = await fetch(`http://localhost:3001/current-trainings/${emailId}`);
        const currentTrainingsData = await responseCurrentTrainings.json();
        setCurrentTrainings(currentTrainingsData.currentTrainings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, [emailId]);
 
  useEffect(() => {
    setEmailId(email);
  }, [email]);
 
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-[300px] rounded-md border shadow-md ml-[10%] mt-10">
          <div className="p-4">
            <h1 className="text-lg font-semibold">TOTAL PURCHASE ORDERS</h1>
            <p className="mt-3 text-gray-600 text-center text-7xl font-bold">{count}</p>
            <button
              type="button"
              className="mt-4 ml-[60%] font-semibold text-black hover:bg-gray-300"
              onClick={() => setSelectedLink('po-details')}
            >
              Know More..
            </button>
          </div>
        </div>
        <div className="w-full md:w-[300px] rounded-md border shadow-md ml-[15%] mt-10">
          <div className="p-4">
            <h1 className="text-lg font-semibold">TOTAL TRAININGS</h1>
            <p className="mt-3 text-gray-600 text-center text-7xl font-bold">{totalTrainings}</p>
            <button
              type="button"
              className="mt-4 ml-[60%] font-semibold text-black hover:bg-gray-300"
              onClick={() => setSelectedLink('my-trainings')}
            >
              Know More..
            </button>
          </div>
        </div>
        <div className="w-[900px]  rounded-md border shadow-md ml-5 mt-10">
          <div className="p-4">
            <h1 className="text-lg font-semibold">CURRENT TRAININGS</h1>
            {currentTrainings.length === 0 ? (
              <p className="mt-3 text-gray-600 text-center">No trainings are currently going on</p>
            ) : (
              <table className="mt-3 w-full text-gray-600">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Company Name</th>
                    <th className="px-2 py-2">Start Date</th>
                    <th className="px-2 py-2">End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTrainings.map(training => (
                    <tr key={training._id}>
                      <td className="border px-4 py-2 text-center">{training.company.companyName}</td>
                      <td className="border px-2 py-2 text-center">{new Date(training.startDate).toLocaleDateString()}</td>
                      <td className="border px-2 py-2 text-center">{new Date(training.endDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default DashboardHome;
 