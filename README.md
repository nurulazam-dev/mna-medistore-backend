# [MNA-MediStore Backend](mna-medistore-backend)

## MNA-MediStore Frontend - [Repo Link:](https://github.com/nurulazam-dev/mna-medistore-frontend)

# Project overview & features:

> Run the project:

```TS
npm run dev
```

## Tech Stack:

### Backend

| Technology            | Purpose  |
| --------------------- | -------- |
| Node.js + Express.js  | REST API |
| Postgres + Prisma ORM | Database |

### Deployment

| Service | Purpose            |
| ------- | ------------------ |
| Vercel  | Backend deployment |

## Order:

| Service                | Access   | API Endpoint                            | Purpose                                                     |
| ---------------------- | -------- | --------------------------------------- | ----------------------------------------------------------- |
| createOrder            | customer | "/"                                     | post a order                                                |
| getMyAllOrder          | customer | "/my-orders"                            | customer get her all own orders                             |
| getOrderById           | customer | "/my-orders/:id"                        | customer get his own order details (By id)                  |
| cancelMyOrder          | customer | "/my-orders/cancel/:id"                 | customer patch his own order(update status => cancel order) |
| getMyMedicinesOrder    | seller   | "/seller/my-medicine-orders"            | seller get his all Medicines orders                         |
| updateMyMedicinesOrder | seller   | "/seller/update-my-medicine-orders/:id" | seller patch his Medicine order(update => status)           |
| getAllOrders           | admin    | "/admin/orders"                         | admin get all orders                                        |
