import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Adminform.css";

function Adminform({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://192.168.1.10:5000/admin/login",
        { email: username, password: password },
        { headers: { "Content-Type": "application/json" } }
      );

      const access_token = response.data.access_token;

      if (access_token) {
        localStorage.setItem("admin_token", access_token);

        
        if (onLoginSuccess) onLoginSuccess();

        navigate("/admin");
      } else {
        setError("Login failed. Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adminform;
