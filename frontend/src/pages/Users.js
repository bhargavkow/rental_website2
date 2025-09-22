import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faEye, faUserCheck, faUserTimes, faTimes } from '@fortawesome/free-solid-svg-icons';
import Popup from "../components/Popup";
import { usePopup } from "../hooks/usePopup";
import { API_URL } from '../config';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { popup, showPopup, hidePopup } = usePopup();
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    age: "",
    gender: "",
    role: "",
    isActive: true
  });

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, roleFilter, statusFilter, sortBy, sortOrder, currentPage]);

    const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        sortBy,
        sortOrder
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (roleFilter) params.append('role', roleFilter);
      if (statusFilter !== "") params.append('isActive', statusFilter);

      const response = await axios.get(`${API_URL}/api/auth/users?${params}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (response.data.success) {
        setUsers(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalUsers(response.data.totalUsers);
      } else {
        setError("Failed to fetch users.");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
      } else {
        setError(err.response?.data?.message || "Failed to fetch users.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      mobileNumber: user.mobileNumber || "",
      age: user.age || "",
      gender: user.gender || "",
      role: user.role || "user",
      isActive: user.isActive !== false
    });
    setShowModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/api/auth/users/${editingUser._id}`,
        editForm,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );

      if (response.data.success) {
        setShowModal(false);
        setEditingUser(null);
        fetchUsers();
        showPopup("User updated successfully!", 'success');
      }
    } catch (err) {
      console.error(err);
      showPopup(err.response?.data?.message || "Failed to update user.", 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        const response = await axios.delete(`${API_URL}/api/auth/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        });

        if (response.data.success) {
          fetchUsers();
          showPopup("User deleted successfully!", 'success');
        }
      } catch (err) {
        console.error(err);
        showPopup(err.response?.data?.message || "Failed to delete user.", 'error');
      }
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/auth/users/${userId}`,
        { isActive: !currentStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );

      if (response.data.success) {
    fetchUsers();
        showPopup(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully!`, 'success');
      }
    } catch (err) {
      console.error(err);
      showPopup(err.response?.data?.message || "Failed to update user status.", 'error');
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
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

  return (
    <div className="container mx-auto p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 lg:mb-0">User Management</h1>
        <div className="text-sm text-gray-600">
          Total Users: <span className="font-semibold">{totalUsers}</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="sm:col-span-2 lg:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </form>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              handleFilterChange();
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              handleFilterChange();
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                handleFilterChange();
              }}
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="createdAt">Registration Date</option>
              <option value="fullName">Name</option>
              <option value="email">Email</option>
              <option value="lastLogin">Last Login</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                handleFilterChange();
              }}
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading users...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Users Display - Responsive */}
      {!loading && !error && users.length > 0 && (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(currentPage - 1) * 20 + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.fullName || `${user.firstName} ${user.lastName}`}
                            </div>
                            <div className="text-sm text-gray-500">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.mobileNumber || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.age ? `${user.age} years` : 'N/A'} • {user.gender || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          Role: <span className="capitalize">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Joined: {formatDate(user.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit User"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user._id, user.isActive)}
                            className={user.isActive ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                            title={user.isActive ? "Deactivate" : "Activate"}
                          >
                            <FontAwesomeIcon icon={user.isActive ? faUserTimes : faUserCheck} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete User"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {users.map((user, index) => (
              <div key={user._id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-medium text-lg">
                          {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {user.fullName || `${user.firstName} ${user.lastName}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Mobile:</span>
                    <span className="text-gray-900">{user.mobileNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Age:</span>
                    <span className="text-gray-900">{user.age ? `${user.age} years` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Gender:</span>
                    <span className="text-gray-900 capitalize">{user.gender || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Role:</span>
                    <span className="text-gray-900 capitalize">{user.role}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Joined:</span>
                    <span className="text-gray-900">{formatDate(user.createdAt)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    #{(currentPage - 1) * 20 + index + 1}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="text-blue-600 hover:text-blue-900 p-2"
                      title="View Details"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-indigo-600 hover:text-indigo-900 p-2"
                      title="Edit User"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user._id, user.isActive)}
                      className={`p-2 ${user.isActive ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}`}
                      title={user.isActive ? "Deactivate" : "Activate"}
                    >
                      <FontAwesomeIcon icon={user.isActive ? faUserTimes : faUserCheck} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:text-red-900 p-2"
                      title="Delete User"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* No Users */}
      {!loading && !error && users.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            <FontAwesomeIcon icon={faUserTimes} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
          <div className="text-sm text-gray-700 text-center sm:text-left">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex justify-center sm:justify-end">
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-2 sm:px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 sm:px-3 py-1 border rounded text-sm ${
                      currentPage === page
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-2 sm:px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for View/Edit User */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 lg:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingUser ? 'Edit User' : 'User Details'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingUser(null);
                  setSelectedUser(null);
                }}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {editingUser ? (
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    value={editForm.mobileNumber}
                    onChange={(e) => setEditForm({...editForm, mobileNumber: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                      type="number"
                      value={editForm.age}
                      onChange={(e) => setEditForm({...editForm, age: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                      value={editForm.gender}
                      onChange={(e) => setEditForm({...editForm, gender: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editForm.isActive}
                      onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Active</label>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingUser(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm lg:text-base w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm lg:text-base w-full sm:w-auto"
                  >
                    Update User
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {selectedUser && (
                  <>
                    <div className="text-center">
                      <div className="mx-auto h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                        <span className="text-white font-medium text-xl">
                          {selectedUser.fullName ? selectedUser.fullName.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold">{selectedUser.fullName || `${selectedUser.firstName} ${selectedUser.lastName}`}</h4>
                      <p className="text-gray-600">@{selectedUser.username}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Email:</span>
                        <span className="text-right">{selectedUser.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Mobile:</span>
                        <span className="text-right">{selectedUser.mobileNumber || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Age:</span>
                        <span className="text-right">{selectedUser.age || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Gender:</span>
                        <span className="text-right capitalize">{selectedUser.gender || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Role:</span>
                        <span className="text-right capitalize">{selectedUser.role}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Status:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          selectedUser.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedUser.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Joined:</span>
                        <span className="text-right">{formatDate(selectedUser.createdAt)}</span>
                      </div>
                      {selectedUser.lastLogin && (
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Last Login:</span>
                          <span className="text-right">{formatDate(selectedUser.lastLogin)}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Popup 
        show={popup.show} 
        message={popup.message} 
        type={popup.type} 
        onClose={hidePopup} 
      />
    </div>
  );
};

export default Users;
