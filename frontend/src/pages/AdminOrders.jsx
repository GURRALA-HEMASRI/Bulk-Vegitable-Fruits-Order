import React, { useEffect, useState } from "react";
import api from "../api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchOrders = () => {
    setLoading(true);
    setErrorMsg("");
    api
      .get("/api/admin/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error(err);
        setErrorMsg("Failed to load orders.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markDelivered = async (orderId) => {
    try {
      await api.put(`/api/admin/orders/${orderId}`, { status: "Delivered" });
      fetchOrders();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to update status.");
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Admin Orders Panel</h2>
          <p className="section-subtitle">
            View all buyer orders and update status.
          </p>
        </div>
        <button className="btn btn-ghost" onClick={fetchOrders}>
          Refresh
        </button>
      </div>

      <div className="card">
        {loading ? (
          <p className="text-muted">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="fancy-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Buyer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.buyer_name}</td>
                    <td>{o.product_name}</td>
                    <td>{o.quantity}</td>
                    <td>{o.delivery_address}</td>
                    <td>
                      <span
                        className={
                          o.status === "Delivered"
                            ? "tag delivered"
                            : "tag pending"
                        }
                      >
                        {o.status}
                      </span>
                    </td>
                    <td>
                      {o.status === "Pending" ? (
                        <button
                          className="btn btn-primary"
                          onClick={() => markDelivered(o.id)}
                        >
                          Mark Delivered
                        </button>
                      ) : (
                        <span className="text-muted">Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {errorMsg && (
          <p className="text-error" style={{ marginTop: 8 }}>
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
