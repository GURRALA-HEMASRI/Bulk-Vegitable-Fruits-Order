const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Apply schema and seed products
const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

db.serialize(() => {
  db.exec(schema, (err) => {
    if (err) {
      console.error("Error applying schema:", err.message);
    } else {
      console.log("Schema ensured.");
      db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (err) {
          console.error("Error counting products:", err.message);
        } else if (row.count === 0) {
          const stmt = db.prepare(
            "INSERT INTO products (name, price_per_unit) VALUES (?, ?)"
          );
          const items = [
            ["Tomato", 20],
            ["Potato", 25],
            ["Onion", 30],
            ["Apple", 120],
            ["Banana (dozen)", 60],
          ];
          items.forEach((p) => stmt.run(p[0], p[1]));
          stmt.finalize();
          console.log("Seeded products.");
        }
      });
    }
  });
});

// Routes
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Internal server error" });
    res.json(rows);
  });
});

app.post("/api/orders", (req, res) => {
  const { product_name, quantity, buyer_name, delivery_address } = req.body;
  if (!product_name || !quantity || !buyer_name || !delivery_address) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const stmt = db.prepare(
    "INSERT INTO orders (product_name, quantity, buyer_name, delivery_address, status) VALUES (?, ?, ?, ?, 'Pending')"
  );
  stmt.run(
    product_name,
    quantity,
    buyer_name,
    delivery_address,
    function (err) {
      if (err) return res.status(500).json({ error: "Internal server error" });
      res.status(201).json({ orderId: this.lastID, status: "Pending" });
    }
  );
  stmt.finalize();
});

app.get("/api/orders/:id", (req, res) => {
  const orderId = req.params.id;
  db.get(
    "SELECT id, product_name, quantity, buyer_name, delivery_address, status FROM orders WHERE id = ?",
    [orderId],
    (err, row) => {
      if (err) return res.status(500).json({ error: "Internal server error" });
      if (!row) return res.status(404).json({ error: "Order not found" });
      res.json(row);
    }
  );
});

app.get("/api/admin/orders", (req, res) => {
  db.all(
    "SELECT id, product_name, quantity, buyer_name, delivery_address, status FROM orders ORDER BY id DESC",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Internal server error" });
      res.json(rows);
    }
  );
});

app.put("/api/admin/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  if (status !== "Delivered" && status !== "Pending") {
    return res.status(400).json({ error: "Invalid status" });
  }
  db.run(
    "UPDATE orders SET status = ? WHERE id = ?",
    [status, orderId],
    function (err) {
      if (err) return res.status(500).json({ error: "Internal server error" });
      if (this.changes === 0)
        return res.status(404).json({ error: "Order not found" });
      res.json({ success: true });
    }
  );
});

// Health route
app.get("/", (req, res) => {
  res.send("Bulk order API running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
