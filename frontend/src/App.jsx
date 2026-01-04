import React, { useState } from "react";
import ProductCatalogue from "./pages/ProductCatalogue";
import PlaceOrder from "./pages/PlaceOrder";
import TrackOrder from "./pages/TrackOrder";
import AdminOrders from "./pages/AdminOrders";
import "./App.css";

const NAV = {
  CATALOGUE: "CATALOGUE",
  ORDER: "ORDER",
  TRACK: "TRACK",
  ADMIN: "ADMIN",
};

function App() {
  const [activePage, setActivePage] = useState(NAV.CATALOGUE);

  const renderPage = () => {
    switch (activePage) {
      case NAV.CATALOGUE:
        return <ProductCatalogue />;
      case NAV.ORDER:
        return <PlaceOrder />;
      case NAV.TRACK:
        return <TrackOrder />;
      case NAV.ADMIN:
        return <AdminOrders />;
      default:
        return <ProductCatalogue />;
    }
  };

  return (
    <div className="app-root">
      <div className="app-shell">
        <header className="app-header">
          <div>
            <h1 className="app-title">FarmFresh Bulk Ordering</h1>
            <p className="app-subtitle">
              Simple platform for bulk vegetable and fruit orders.
            </p>
          </div>
          <span className="badge">Assignment Demo</span>
        </header>

        <nav className="nav-tabs">
          <button
            className={
              activePage === NAV.CATALOGUE ? "nav-tab active" : "nav-tab"
            }
            onClick={() => setActivePage(NAV.CATALOGUE)}
          >
            Catalogue
          </button>
          <button
            className={activePage === NAV.ORDER ? "nav-tab active" : "nav-tab"}
            onClick={() => setActivePage(NAV.ORDER)}
          >
            Place Order
          </button>
          <button
            className={activePage === NAV.TRACK ? "nav-tab active" : "nav-tab"}
            onClick={() => setActivePage(NAV.TRACK)}
          >
            Track Order
          </button>
          <button
            className={activePage === NAV.ADMIN ? "nav-tab active" : "nav-tab"}
            onClick={() => setActivePage(NAV.ADMIN)}
          >
            Admin
          </button>
        </nav>

        <main className="app-main">{renderPage()}</main>

        <footer className="app-footer">
          <small>React • Node • SQLite</small>
        </footer>
      </div>
    </div>
  );
}

export default App;
