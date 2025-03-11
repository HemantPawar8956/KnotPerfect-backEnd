import express from "express";
import cors from "cors";

import "dotenv/config";
import userRoutes from "./routers/userRoutes.js";
import { connectDB } from "./connection/dbConnection.js";
import hallRoutes from "./routers/hallRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

connectDB(process.env.mongodb_URL);

app.use("/user", userRoutes);
app.use("/hall", hallRoutes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`application is working on the port no ${PORT}`);
});
