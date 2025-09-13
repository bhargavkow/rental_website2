import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

function Order() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const response = await axios.get(
          "http://192.168.1.10:5000/order/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setOrders(response.data.orders || []);
      } catch (err) {
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="order-page"><p>Loading orders...</p></div>;
  }

  if (error) {
    return <div className="order-page"><p className="error">{error}</p></div>;
  }

  return (
    <div className="order-page">
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Cloth</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Final Price</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Order Date</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.address.first_name} {order.address.last_name}</td>
                <td>{order.cloth.cloth_name}</td>
                <td>{order.cloth_size.size}</td>
                <td>{order.quantity}</td>
                <td>₹{order.final_price}</td>
                <td>{order.order_status}</td>
                <td>{order.payment_status}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>
                  {order.address.street_address}, {order.address.city}, {order.address.state}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Order;