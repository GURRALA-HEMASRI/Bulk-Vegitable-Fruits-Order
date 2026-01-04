import React, { useState } from "react";
import api from "../api";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setOrder(null);

    if (!orderId) {
      setErrorMsg("Please enter an Order ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(`/api/orders/${orderId}`);
      setOrder(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setErrorMsg("Order not found. Check the ID.");
      } else {
        setErrorMsg("Unable to fetch order. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Track Order</h2>
          <p className="section-subtitle">
            Enter your Order ID to see current status.
          </p>
        </div>
        <div className="chip">Status: Pending / Delivered</div>
      </div>

      <div className="card">
        <form onSubmit={handleTrack} style={{ display: "flex", gap: 8 }}>
          <input
            type="number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" type="submit">
            {loading ? "Checking..." : "Check status"}
          </button>
        </form>

        {errorMsg && (
          <p className="text-error" style={{ marginTop: 8 }}>
            {errorMsg}
          </p>
        )}

        {order && (
          <div className="order-summary">
            <p>
              <strong>Order #{order.id}</strong> for {order.product_name} (x
              {order.quantity})
            </p>
            <p className="text-muted">
              Buyer: {order.buyer_name} • Address: {order.delivery_address}
            </p>
            <p style={{ marginTop: 4 }}>
              Status:{" "}
              <span
                className={
                  order.status === "Delivered"
                    ? "tag delivered"
                    : "tag pending"
                }
              >
                {order.status}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
