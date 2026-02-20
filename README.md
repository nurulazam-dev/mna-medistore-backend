# ⚙️ MNA-MediStore Backend

[![Backend Deployment](https://img.shields.io/badge/Deployment-Vercel-blue)](https://mna-medistore-backend.vercel.app/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791)](https://www.postgresql.org/)

The core engine of MNA-MediStore, providing a secure RESTful API for managing pharmaceutical inventory, multi-role authentication, and complex order processing. Built with a focus on data integrity and relational mapping.

## 🔗 Project Links

- **Live API Base URL:** [mna-medistore-backend.vercel.app](https://mna-medistore-backend.vercel.app/)
- **Frontend Live Link:** [mna-medistore.vercel.app](https://mna-medistore.vercel.app/)
- **Frontend Repository:** [MNA-MediStore Frontend](https://github.com/nurulazam-dev/mna-medistore-frontend)

---

### Database Schema Diagram Design

## ![preview img](./mna-medistore-db-design.png)

## 🛠️ Tech Stack

### Backend Architecture

| Technology      | Purpose                                                                       |
| :-------------- | :---------------------------------------------------------------------------- |
| **Node.js**     | Cross-platform JavaScript runtime environment for server-side execution.      |
| **Express.js**  | Fast, unopinionated web framework for building the RESTful API routing.       |
| **Postgres**    | Relational Database Management System (RDBMS) for structured data storage.    |
| **Prisma ORM**  | Next-generation Node.js and TypeScript ORM for type-safe database access.     |
| **Better Auth** | Comprehensive framework-agnostic authentication library for role management.  |
| **TypeScript**  | Static typing to ensure code reliability and catch errors during development. |
| **CORS**        | Middleware to enable secure cross-origin resource sharing with the frontend.  |
| **Dotenv**      | Zero-dependency module that loads environment variables from a `.env` file.   |

---

## 🔑 Verified Login Credentials (Testing)

| Role         | Email                    | Password      |
| :----------- | :----------------------- | :------------ |
| **Admin**    | `admin@medistore.com`    | `Admin123`    |
| **Seller**   | `seller@medistore.com`   | `Seller123`   |
| **Customer** | `customer@medistore.com` | `Customer123` |

---

## 📑 API Documentation

### 1. 🛒 Order Management

| Service                  | Access   | API Endpoint                                         | Purpose                                              |
| :----------------------- | :------- | :--------------------------------------------------- | :--------------------------------------------------- |
| `createOrder`            | Customer | `POST /orders`                                       | Place a new order with items from the cart.          |
| `getMyAllOrder`          | Customer | `GET /orders/my-orders`                              | Fetch all orders placed by the current user.         |
| `getOrderById`           | Customer | `GET /orders/my-orders/:id`                          | Get detailed information of a specific order.        |
| `cancelMyOrder`          | Customer | `PATCH /orders/my-orders/cancel/:id`                 | Cancel an order (Allowed only before processing).    |
| `getMyMedicinesOrder`    | Seller   | `GET /orders/seller/my-medicine-orders`              | View orders containing medicines sold by the seller. |
| `updateMyMedicinesOrder` | Seller   | `PATCH /orders/seller/update-my-medicine-orders/:id` | Update status (Pending/Shipping/Delivered).          |
| `getAllOrders`           | Admin    | `GET /orders/admin/orders`                           | Retrieve every order in the system for oversight.    |

### 2. 💊 Medicine Management

| Service           | Access       | API Endpoint                  | Purpose                                           |
| :---------------- | :----------- | :---------------------------- | :------------------------------------------------ |
| `getAllMedicines` | Public       | `GET /medicines`              | Get all active medicines with filters/pagination. |
| `getMedicineById` | Public       | `GET /medicines/:id`          | View details of a single medicine.                |
| `addMedicine`     | Seller       | `POST /medicines/add`         | Seller adds a new medicine to the store.          |
| `updateMedicine`  | Seller/Admin | `PATCH /medicines/update/:id` | Update the medicine data.                         |
| `toggleStatus`    | Seller       | `PATCH /medicines/status/:id` | Activate or Inactivate a medicine listing.        |

### 3. 📂 Category Management

| Service          | Access | API Endpoint            | Purpose                                           |
| :--------------- | :----- | :---------------------- | :------------------------------------------------ |
| `getCategories`  | Public | `GET /categories`       | List all medicine categories.                     |
| `createCategory` | Admin  | `POST /categories`      | Admin creates a new category (e.g., Antibiotics). |
| `updateCategory` | Admin  | `PATCH /categories/:id` | Edit category name or metadata.                   |

### 4. 👥 User & Admin Management

| Service         | Access | API Endpoint                  | Purpose                                       |
| :-------------- | :----- | :---------------------------- | :-------------------------------------------- |
| `getUsers`      | Admin  | `GET /users`                  | Admin fetches all registered users.           |
| `updateUser`    | Admin  | `PATCH /users/update/:id`     | Admin updates user role or account status.    |
| `getMe`         | Auth   | `GET /users/me`               | Get currently logged-in user session profile. |
| `updateProfile` | Auth   | `PATCH /users/profile/update` | User updates own name, phone, or address.     |

---

## 🗄️ Database Schema (Prisma)

The database uses a relational model to ensure that orders are linked correctly to sellers and customers.

### Key Relations:

- **User ↔ Medicine:** One-to-Many (A seller owns multiple medicines).
- **Category ↔ Medicine:** One-to-Many (Each medicine belongs to a category).
- **Order ↔ OrderItems:** One-to-Many (An order contains multiple medicine items).
- **Medicine ↔ OrderItems:** One-to-Many (Medicines are linked to order history).

---

## 🚀 Local Installation

1. **Clone & Install:**

   ```bash
   git clone [https://github.com/nurulazam-dev/mna-medistore-backend.git](https://github.com/nurulazam-dev/mna-medistore-backend.git)
   cd mna-medistore-backend
   npm install
   ```

2. **Environment Setup:** Create a `.env` file:

   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/medistore"
   BETTER_AUTH_SECRET="your_secret"
   PORT=5000
   ```

3. **Database Migration:**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Start Server:**
   ```bash
   npm run dev
   ```

### 🌐 Deployment

This backend is deployed on Vercel using a Serverless function architecture optimized for Node.js runtimes.

#### Developed with 💖 by Mohammad Nurul Azam(@nurulazam-dev)
