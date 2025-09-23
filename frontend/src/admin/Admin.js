import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faShoppingCart, faCreditCard, faUsers, faPlusCircle, faImages, faTags, faMapMarkerAlt, faQuestionCircle, faHome, faLayerGroup, faCamera, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import Payment from "../pages/Payment";
import Users from "../pages/Users";
import Addproduct from "../admin/Addproduct";
import CarouselManager from "../admin/CarouselManager";
import CategoryManager from "../admin/categorymanager";
import SubcategoryManager from "../admin/SubcategoryManager";
import HomepageCategoryManager from "../admin/HomepageCategoryManager";
import LocationManager from "../admin/LocationManager";
import FAQManagement from "./FAQManagement";
import PhotoCarouselManager from "./PhotoCarouselManager";
import Adminform from "./Adminform";

function Admin() {
  const [page, setPage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("admin_token"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const renderPage = () => {
    switch (page) {
      case "order":
        return <Order />;
      case "payment":
        return <Payment />;
      case "users":
        return <Users />;
      case "Addproduct":
        return <Addproduct />;
      case "carousel":
        return <CarouselManager />;
      case "categories":
        return <CategoryManager />;
      case "subcategories":
        return <SubcategoryManager />;
      case "homepage-categories":
        return <HomepageCategoryManager />;
      case "locations":
        return <LocationManager />;
      case "faqs":
        return <FAQManagement />;
      case "photo-carousel":
        return <PhotoCarouselManager />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
        <Adminform onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-[9999] bg-gray-800 text-white p-3 rounded-md shadow-xl border-2 border-white"
      >
        <FontAwesomeIcon icon={faBars} className="text-lg" />
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 h-full overflow-y-auto">
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-end mb-4">
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-gray-300 p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="space-y-2 sm:space-y-4">
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faTachometerAlt} />}
              label="Dashboard"
              onClick={() => handlePageChange("dashboard")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faShoppingCart} />}
              label="Orders"
              onClick={() => handlePageChange("order")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faCreditCard} />}
              label="Payments"
              onClick={() => handlePageChange("payment")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faUsers} />}
              label="Users"
              onClick={() => handlePageChange("users")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faPlusCircle} />}
              label="Add Product"
              onClick={() => handlePageChange("Addproduct")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faImages} />}
              label="Carousel Images"
              onClick={() => handlePageChange("carousel")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faCamera} />}
              label="Photo Carousel"
              onClick={() => handlePageChange("photo-carousel")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faTags} />}
              label="Categories"
              onClick={() => handlePageChange("categories")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faLayerGroup} />}
              label="Subcategories"
              onClick={() => handlePageChange("subcategories")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faHome} />}
              label="Homepage Categories"
              onClick={() => handlePageChange("homepage-categories")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
              label="Locations"
              onClick={() => handlePageChange("locations")}
            />
            <SidebarIcon
              icon={<FontAwesomeIcon icon={faQuestionCircle} />}
              label="FAQs"
              onClick={() => handlePageChange("faqs")}
            />
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 ml-0 p-2 sm:p-4 lg:p-6 bg-gray-50 overflow-auto">
        <div className="bg-white shadow-xl rounded-lg p-2 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 mt-16 lg:mt-0">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

const SidebarIcon = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:bg-gray-700 p-2 sm:p-3 rounded-lg transition-colors duration-200"
    >
      <span className="text-sm sm:text-lg">{icon}</span>
      <span className="text-xs sm:text-sm lg:text-base">{label}</span>
    </div>
  );
};

export default Admin;
