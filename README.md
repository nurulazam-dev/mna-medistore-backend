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

| Service                | Access   | API Endpoint                            | Purpose                                       |
| ---------------------- | -------- | --------------------------------------- | --------------------------------------------- |
| createOrder            | customer | "/"                                     | post a order                                  |
| getMyAllOrder          | customer | "/my-orders"                            | get my all orders                             |
| getOrderById           | customer | "/my-orders/:id"                        | get my order by id(details)                   |
| cancelMyOrder          | customer | "/my-orders/cancel/:id"                 | patch my order(update status => cancel order) |
| getMyMedicinesOrder    | seller   | "/seller/my-medicine-orders"            | get my all Medicines orders                   |
| updateMyMedicinesOrder | seller   | "/seller/update-my-medicine-orders/:id" | patch my Medic ord(upd status)                |
| getAllOrders           | admin    | "/admin/orders"                         | get all orders                                |
