import express, { Application } from "express";
import cors from "cors";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { notFound } from "./middleware/notFound";
import { categoryRouter } from "./modules/category/category.router";
import { medicineRouter } from "./modules/medicine/medicine.router";
import { userRouter } from "./modules/user/user.router";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/medicines", medicineRouter);

app.get("/", (req, res) => {
  res.send("Running the MNA_MediStore_Server");
});

app.use(notFound);

export default app;
