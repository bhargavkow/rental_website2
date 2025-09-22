import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faShoppingCart, faCreditCard, faBox, faChartLine, faClock, faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../config";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalPayments: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    recentOrders: [],
    recentUsers: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("admin_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Fetch all data in parallel
      const [usersResponse, ordersResponse, paymentsResponse] = await Promise.all([
        axios.get(`${API_URL}/api/auth/users?limit=1000`, { headers }),
        axios.get(`${API_URL}/api/orders`, { headers }),
        axios.get(`${API_URL}/api/payments`, { headers })
      ]);

      // Process users data
      const users = usersResponse.data.success ? usersResponse.data.data : [];
      const totalUsers = usersResponse.data.totalUsers || users.length;

      // Process orders data
      const orders = ordersResponse.data.success ? ordersResponse.data.data : [];
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(order => order.status === 'pending').length;
      const completedOrders = orders.filter(order => order.status === 'completed').length;

      // Process payments data
      const payments = paymentsResponse.data.success ? paymentsResponse.data.data : [];
      const totalPayments = payments.length;
      const totalRevenue = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

      // Get recent orders (last 5)
      const recentOrders = orders.slice(0, 5);

      // Get recent users (last 5)
      const recentUsers = users.slice(0, 5);

      setStats({
        totalUsers,
        totalOrders,
        totalPayments,
        totalRevenue,
        pendingOrders,
        completedOrders,
        recentOrders,
        recentUsers
      });

    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 lg:p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-0">Dashboard Overview</h1>
        <div className="flex gap-2">
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-sm"
          >
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="px-4 lg:px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 text-sm lg:text-base w-full lg:w-auto"
          >
            Logout
          </button>
        </div>
      </div>

      <p className="mt-4 text-gray-700 text-sm lg:text-base mb-6">Real-time statistics about your rental business.</p>

      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <div className="p-4 lg:p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">Total Users</h3>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
              <p className="text-blue-100 text-sm mt-1">Registered users</p>
            </div>
            <FontAwesomeIcon icon={faUsers} className="text-4xl text-blue-200" />
          </div>
        </div>

        <div className="p-4 lg:p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">Total Orders</h3>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
              <p className="text-green-100 text-sm mt-1">All time orders</p>
            </div>
            <FontAwesomeIcon icon={faShoppingCart} className="text-4xl text-green-200" />
          </div>
        </div>

        <div className="p-4 lg:p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">Total Revenue</h3>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-purple-100 text-sm mt-1">From payments</p>
            </div>
            <FontAwesomeIcon icon={faCreditCard} className="text-4xl text-purple-200" />
          </div>
        </div>

        <div className="p-4 lg:p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">Total Payments</h3>
              <p className="text-3xl font-bold">{stats.totalPayments}</p>
              <p className="text-orange-100 text-sm mt-1">Successful payments</p>
            </div>
            <FontAwesomeIcon icon={faBox} className="text-4xl text-orange-200" />
          </div>
        </div>
      </div>

      {/* Order Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <div className="p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Pending Orders</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              <p className="text-gray-600 text-sm mt-1">Awaiting processing</p>
            </div>
            <FontAwesomeIcon icon={faClock} className="text-4xl text-yellow-400" />
          </div>
        </div>

        <div className="p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Completed Orders</h3>
              <p className="text-3xl font-bold text-green-600">{stats.completedOrders}</p>
              <p className="text-gray-600 text-sm mt-1">Successfully delivered</p>
            </div>
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-green-400" />
          </div>
        </div>

        <div className="p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Completion Rate</h3>
              <p className="text-3xl font-bold text-blue-600">
                {stats.totalOrders > 0 ? Math.round((stats.completedOrders / stats.totalOrders) * 100) : 0}%
              </p>
              <p className="text-gray-600 text-sm mt-1">Order success rate</p>
            </div>
            <FontAwesomeIcon icon={faChartLine} className="text-4xl text-blue-400" />
          </div>
        </div>
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-blue-500" />
            Recent Orders
          </h3>
          <div className="space-y-3">
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order, index) => (
                <div key={order._id || index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        Order #{order.orderNumber || order._id?.slice(-6)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.customerInfo?.firstName} {order.customerInfo?.lastName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(order.pricing?.total || order.totalAmount || 0)}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FontAwesomeIcon icon={faShoppingCart} className="text-4xl mb-2" />
                <p>No orders yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FontAwesomeIcon icon={faUsers} className="mr-2 text-green-500" />
            Recent Users
          </h3>
          <div className="space-y-3">
            {stats.recentUsers.length > 0 ? (
              stats.recentUsers.map((user, index) => (
                <div key={user._id || index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-medium">
                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.fullName || `${user.firstName} ${user.lastName}`}
                      </p>
                      <p className="text-xs text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FontAwesomeIcon icon={faUsers} className="text-4xl mb-2" />
                <p>No users yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
            <FontAwesomeIcon icon={faBox} className="mr-2" />
            Add Product
          </button>
          <button className="p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            View Orders
          </button>
          <button className="p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Manage Users
          </button>
          <button className="p-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
