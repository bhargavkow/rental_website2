import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Order from "./components/Order";
import Payment from "./components/Payment";
import Users from "./components/Users";
import Addproduct from "./components/Addproduct";
import "./Admin.css";
import Adminform from "./components/Adminform";

function Admin() {
  const [page, setPage] = useState("dashboard");

  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("admin_token"));


  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const renderPage = () => {
    switch (page) {
      case "order": return <Order />;
      case "payment": return <Payment />;
      case "users": return <Users />;
      case "Addproduct": return <Addproduct />;
      default: return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Adminform onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="admin">
      <Sidebar setPage={setPage} />
      <div className="admin-main-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default Admin;
