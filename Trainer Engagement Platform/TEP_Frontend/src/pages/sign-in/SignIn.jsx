import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2"; 

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
 
      if (response.ok) {
        const { role, token } = await response.json(); // Parse the JSON response
 
        // Store the token for later use in requests
        localStorage.setItem("token", token);
 
        // Redirect user based on role
        if (role === "trainer") {
          //alert('Login Successfully!')
          // Show SweetAlert login successfully 
          Swal.fire({
            icon: "success",
            title: "Login Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/trainer-dashboard/${email}`);

        } else if (role === "company") {
          // Show SweetAlert login successfully 
          Swal.fire({
            icon: "success",
            title: "Login Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/business-dashboard/${email}`);

        } else if (role === "admin") {
          // Show SweetAlert login successfully 
          Swal.fire({
            icon: "success",
            title: "Login Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/admin-dashboard");
        }
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      setErrorMsg("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5">
          <h2 className="text-3xl font-bold text-white text-center">Sign In</h2>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white ${
              loading
                ? "bg-purple-400"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {errorMsg && (
            <div className="text-center text-red-500 bg-red-100 rounded-lg p-2">
              {errorMsg}
            </div>
          )}

        </form>
      </div>
    </div>
    </>
  );
};

export default SignIn;
