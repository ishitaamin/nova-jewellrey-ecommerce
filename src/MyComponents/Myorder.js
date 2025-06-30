import React, { useEffect, useState } from "react";
import axios from "axios";
import './Myorder.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:4000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-page">
        <h2>📦 My Orders</h2>
        <p style={{ textAlign: 'center' }}>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <img src="/images/no-orders.svg" alt="No Orders" />
          <p>You haven't placed any orders yet.</p>
          <a href="/">Start Shopping</a>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={order._id} className="order-item">
              <h4>Order #{index + 1}</h4>
              <p><strong>Date:</strong> {order.date}</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} — ₹{item.discountedPrice}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
