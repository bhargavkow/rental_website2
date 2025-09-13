import React from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("admin_token");
    
    navigate("/admin");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard Overview</h1>
        <button 
          onClick={handleLogout} 
          style={{
            padding: "10px 20px",
            background: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      <p>Quick stats about orders, users, and payments.</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ padding: "20px", background: "#f4f4f4", borderRadius: "8px" }}>
          <h3>Orders</h3>
          <p>120</p>
        </div>
        <div style={{ padding: "20px", background: "#f4f4f4", borderRadius: "8px" }}>
          <h3>Payments</h3>
          <p>$12,500</p>
        </div>
        <div style={{ padding: "20px", background: "#f4f4f4", borderRadius: "8px" }}>
          <h3>Users</h3>
          <p>85</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;