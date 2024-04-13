import React, { useState, useEffect } from "react";
import { BarChart, Wallet } from "lucide-react";
import TrainerDetails from "./TrainersDetails";
import CompanyDetails from "./CompaniesDetails";
import AdminNavbar from "../../components/AdminNavbar";
import PurchaseOrderComponent from "./PurchaseOrderComponent";
import BusinessRequestsDetails from "./BusinessRequestDetails";
import RevenueAnalysisPage from "./RevenueAnalysisPage";
import TrainerInvoicesTable from "./TrainerInvoicesTable";
import DeleteRequest from "./DeleteRequest";
import InterviewList from "./InterviewList";
 
function AdminDashboard() {
  const [email, setEmail] = useState(null);
  const [selectedLink, setSelectedLink] = useState("dashboard");
 
  useEffect(() => {
    // Parse the email from the URL
    const url = window.location.href;
    const emailStartIndex = url.lastIndexOf("/") + 1;
    const emailEndIndex = url.indexOf("@") + 1;
    const extractedEmail = url.slice(emailStartIndex, emailEndIndex);
    setEmail(extractedEmail + "gmail.com"); // Append @gmail.com
  }, []);
 
  // Function to render the component based on the selected tab
  const renderComponent = () => {
    switch (selectedLink) {
      case "dashboard":
        return <RevenueAnalysisPage />;
      case "trainer-details":
        return <TrainerDetails />;
      case "company-details":
        return <CompanyDetails />;
      case "purchase-order-component":
        return <PurchaseOrderComponent />;
      case "business-request":
        return <BusinessRequestsDetails />;
      case "invoice":
        return <TrainerInvoicesTable />;
      case "deletion-request":
        return <DeleteRequest />;
      case "interviewList":
          return <InterviewList/>
      default:
        return null;
    }
  };
 
  return (
    <>
      <AdminNavbar />
      <div className="flex h-screen">
        <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
          <div className="mt-6 flex flex-1 flex-col justify-between">
            <nav className="-mx-3 space-y-6">
              <div
                onClick={() => setSelectedLink("dashboard")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "dashboard"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <BarChart className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Dashboard</span>
              </div>
 
              <div
                onClick={() => setSelectedLink("trainer-details")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "trainer-details"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>
 
                <span className="mx-2 text-sm font-medium">
                  Trainer Details
                </span>
              </div>
 
              <div
                onClick={() => setSelectedLink("company-details")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "company-details"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>
 
                <span className="mx-2 text-sm font-medium">
                  Company Details
                </span>
              </div>
 
              <div
                onClick={() => setSelectedLink("business-request")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "business-request"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
 
                <span className="mx-2 text-sm font-medium">
                  Business Request
                </span>
              </div>


              <div
                onClick={() => setSelectedLink("interviewList")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "company-details"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>
 
                <span className="mx-2 text-sm font-medium">
                  Interview List
                </span>
              </div>
 
              <div
                onClick={() => setSelectedLink("purchase-order-component")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "purchase-order-component"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <Wallet className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Purchase Order</span>
              </div>
              <div
                onClick={() => setSelectedLink("invoice")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "invoice" ? "bg-gray-100 text-gray-700" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                <span className="mx-2 text-sm font-medium">Invoice</span>
              </div>
             
              <div
                onClick={() => setSelectedLink("deletion-request")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "trainer-details"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>
 
                <span className="mx-2 text-sm font-medium">
                  Deletion Request
                </span>
              </div>
 
            </nav>
          </div>
        </aside>
 
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {renderComponent()}
        </main>
      </div>
    </>
  );
}
 
export default AdminDashboard;