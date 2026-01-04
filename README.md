# 🥕 Bulk Vegetable & Fruit Ordering Platform

## 📌 Objective
This project is a simple full-stack web application that allows users to browse vegetables/fruits and place bulk orders, while admins can view all orders and update their delivery status.

The application demonstrates a complete buyer flow and basic admin operations using a React frontend, Node.js backend, and SQLite database.

---

## 🚀 Features Implemented

### 👤 Buyer Features

#### 1. Browse Vegetables/Fruits
- Displays a product catalogue with:
  - Product name
  - Price per unit
- Products are fetched from the backend API

#### 2. Place Bulk Orders
Buyers can place an order by providing:
- Vegetable/Fruit name
- Quantity
- Buyer name
- Delivery address

Each order is saved in the database with:
- Unique Order ID
- Order status (default: **Pending**)

#### 3. Order Tracking
- Buyers can track their order using the **Order ID**
- Displays current order status:
  - `Pending`
  - `Delivered`

---

### 🛠 Admin Features

#### 1. Order Management
- View a list of all placed orders with:
  - Buyer name
  - Product name
  - Quantity
  - Delivery address
  - Current order status

#### 2. Update Order Status
- Admin can update order status:
  - `Pending → Delivered`

> 🔔 Note:  
> No authentication is implemented. Admin access is provided through a separate route/page as per requirements.

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- HTML, CSS
- Axios for API communication

### Backend
- Node.js
- Express.js

### Database
- SQLite (local file database)

---

## 📂 Project Structure
Bulk-Vegitable-Fruits-Order/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── public/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── database.sqlite
│ ├── server.js
│ └── package.json
│
├── README.md
└── .gitignore


---

## 🔗 API Endpoints

### Product APIs
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/products` | Fetch product list |

### Order APIs
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders/:id` | Fetch order status by Order ID |

### Admin APIs
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/admin/orders` | View all orders |
| PUT | `/api/admin/orders/:id` | Update order status |

---




