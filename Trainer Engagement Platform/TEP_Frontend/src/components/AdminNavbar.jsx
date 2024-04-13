import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Delete token from localStorage
    localStorage.removeItem("token");
    // Redirect to home page
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 flex justify-between">
      <ul className="flex">
        <li className="mr-6">
          <NavLink
            to="/admin-dashboard"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block transition duration-300 ease-in-out rounded-full"
            activeClassName="bg-yellow-500"
          >
            Admin Dashboard
          </NavLink>
        </li>
      </ul>

      <ul className="flex">
        <li className="mr-6">


          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 px-4 py-2 inline-block transition duration-300 ease-in-out rounded-full"
          >
            Logout
          </button>
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg> */}
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
