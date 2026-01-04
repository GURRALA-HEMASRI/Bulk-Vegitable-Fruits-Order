import React, { useEffect, useState } from "react";
import api from "../api";

function PlaceOrder() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setResult(null);

    if (!selectedProduct || !quantity || !buyerName || !deliveryAddress) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/api/orders", {
        product_name: selectedProduct,
        quantity: Number(quantity),
        buyer_name: buyerName.trim(),
        delivery_address: deliveryAddress.trim(),
      });
      setResult(res.data);
      setQuantity("");
      setBuyerName("");
      setDeliveryAddress("");
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to place order. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const pricePerUnit =
    products.find((p) => p.name === selectedProduct)?.price_per_unit || 0;
  const estimatedCost =
    pricePerUnit && quantity ? pricePerUnit * Number(quantity) : 0;

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Place Bulk Order</h2>
          <p className="section-subtitle">
            Select item, quantity, and delivery details to submit order.
          </p>
        </div>
        <div className="chip">
          Status default: <strong>Pending</strong>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label>
                <span>Vegetable/Fruit</span>
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Select item</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} (₹{p.price_per_unit} / unit)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>
                <span>Quantity</span>
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 50"
              />
            </div>

            <div className="form-field">
              <label>
                <span>Buyer name</span>
              </label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="form-field">
              <label>
                <span>Delivery address</span>
              </label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Street, area, city, pincode"
              />
            </div>
          </div>

          <div className="order-summary">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="text-muted">Estimated cost</span>
              <strong>₹{estimatedCost.toFixed(2)}</strong>
            </div>
            <p className="text-muted" style={{ marginTop: 4 }}>
              Final price may vary; this is just a rough estimate.
            </p>
          </div>

          <div className="form-footer">
            {errorMsg && <span className="text-error">{errorMsg}</span>}
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                setSelectedProduct("");
                setQuantity("");
                setBuyerName("");
                setDeliveryAddress("");
                setResult(null);
                setErrorMsg("");
              }}
            >
              Clear
            </button>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Placing..." : "Submit Order"}
            </button>
          </div>
        </form>

        {result && (
          <div className="order-summary" style={{ marginTop: 10 }}>
            <p>
              Order placed successfully! Your Order ID is{" "}
              <strong>{result.orderId}</strong>.
            </p>
            <p className="text-muted">
              Use the Track Order tab with this ID to check status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;
