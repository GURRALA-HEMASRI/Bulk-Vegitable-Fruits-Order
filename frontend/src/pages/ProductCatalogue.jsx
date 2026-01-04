import React, { useEffect, useState } from "react";
import api from "../api";

function ProductCatalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Product Catalogue</h2>
          <p className="section-subtitle">
            Browse available vegetables and fruits with live pricing.
          </p>
        </div>
        <div className="chip">Static products from SQLite DB</div>
      </div>

      <div className="card">
        {loading ? (
          <p className="text-muted">Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="fancy-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Price / unit (₹)</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.price_per_unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-muted" style={{ marginTop: 8 }}>
          Use the Place Order tab to submit a bulk order.
        </p>
      </div>
    </div>
  );
}

export default ProductCatalogue;
