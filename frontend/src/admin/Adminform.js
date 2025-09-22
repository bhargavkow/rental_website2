import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config"; // e.g., "https://backend2-5tar.onrender.com"

function Adminform({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true // required if backend uses cookies
        }
      );

      const token = response.data.data?.token;

      if (token) {
        localStorage.setItem("admin_token", token); // store token
        if (onLoginSuccess) onLoginSuccess();
        navigate("/admin"); // redirect to admin panel
      } else {
        setError("Login failed. Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Network error or invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 lg:p-8 w-full max-w-sm">
        <h2 className="text-xl lg:text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold text-sm lg:text-base transition-colors duration-200 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adminform;
