import express, { Application } from "express";
import cors from "cors";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { notFound } from "./middleware/notFound";
import { categoryRouter } from "./modules/category/category.router";
import { medicineRouter } from "./modules/medicine/medicine.router";
import { userRouter } from "./modules/user/user.router";
import { orderRouter } from "./modules/order/order.router";
import { reviewRouter } from "./modules/review/review.router";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(
  cors({
    origin: process.env.FRONTEND_APP_URL,
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/medicines", medicineRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);

app.get("/", (req, res) => {
  res.send("MNA_Medicine_Store Server");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
